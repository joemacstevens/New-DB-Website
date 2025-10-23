import type { APIRoute } from 'astro';
import type {
  PricingOption,
  ScheduleClass,
  ScheduleCoach,
  ScheduleLocation,
  SchedulePayload,
  ScheduleQueryParams,
  ScheduleSession,
} from '../../types/schedule';

export type MindbodyListResponse = {
  data: MindbodyClassTime[];
  included?: MindbodyIncluded[];
};

export type MindbodyClassTime = {
  id: string;
  type: 'classTime';
  attributes: {
    category: string | null;
    subcategory: string | null;
    waitlistable: 0 | 1;
    duration: number;
    openings: number;
    webOpenings?: number;
    capacity: number;
    startTime: string;
    endTime: string;
    purchaseOptions: MindbodyPurchaseOption[] | null;
  };
  relationships: {
    course?: { data?: { id: string } | null };
    location?: { data?: { id: string } | null };
    staff?: { data?: { id: string } | null };
  };
};

type MindbodyPurchaseOption = {
  id: string;
  name: string;
  isPackage: boolean;
  isIntroOffer: boolean;
  isSingleSession: boolean;
  pricing?: {
    retail?: string | null;
    online?: string | null;
  } | null;
};

export type MindbodyIncluded =
  | {
      id: string;
      type: 'course';
      attributes: {
        name: string;
        description?: string | null;
        category?: string | null;
        subcategory?: string | null;
        slug?: string | null;
      };
    }
  | {
      id: string;
      type: 'staff';
      attributes: {
        name?: string | null;
        identitySlug?: string | null;
      };
    }
  | {
      id: string;
      type: 'location';
      attributes: {
        name?: string | null;
        address?: string | null;
        address2?: string | null;
        city?: string | null;
        state?: string | null;
        postalCode?: string | null;
        phone?: string | null;
        latLon?: string | null;
      };
    };

type LogLevel = 'info' | 'warn' | 'error';

type RateBucket = {
  count: number;
  resetAt: number;
};

const API_URL = 'https://prod-mkt-gateway.mindbody.io/v1/search/class_times';
const LOCATION_SLUG = 'different-breed-sports-academy';
const MAX_WINDOW_DAYS = 14;
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60_000;
const CACHE_CONTROL_HEADER = 's-maxage=60, stale-while-revalidate=300';

const rateBuckets = new Map<string, RateBucket>();
const classCache = new Map<string, ScheduleClass>();
const coachCache = new Map<string, ScheduleCoach>();
const locationCache = new Map<string, ScheduleLocation>();

const buildLogger = (requestId: string) =>
  (level: LogLevel, message: string, meta?: Record<string, unknown>) => {
    const payload = {
      requestId,
      message,
      ...meta,
    };
    if (level === 'error') {
      console.error('[schedule-proxy]', payload);
    } else if (level === 'warn') {
      console.warn('[schedule-proxy]', payload);
    } else {
      console.log('[schedule-proxy]', payload);
    }
  };

export const sanitizeNumber = (value?: string | null): number | null => {
  if (!value) return null;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const parseLatLon = (latLon?: string | null): { latitude?: number; longitude?: number } => {
  if (!latLon) return {};
  const [lat, lon] = latLon.split(',').map((part) => Number.parseFloat(part.trim()));
  return {
    latitude: Number.isFinite(lat) ? lat : undefined,
    longitude: Number.isFinite(lon) ? lon : undefined,
  };
};

export const buildPurchaseOptions = (options?: MindbodyPurchaseOption[] | null): PricingOption[] => {
  if (!options?.length) return [];
  return options.map((option) => ({
    id: option.id,
    name: option.name,
    retail: sanitizeNumber(option.pricing?.retail ?? null),
    online: sanitizeNumber(option.pricing?.online ?? null),
    isPackage: Boolean(option.isPackage),
    isIntroOffer: Boolean(option.isIntroOffer),
    isSingleSession: Boolean(option.isSingleSession),
  }));
};

export const normalizeIncluded = (included: MindbodyIncluded[] | undefined) => {
  const classes: Record<string, ScheduleClass> = {};
  const coaches: Record<string, ScheduleCoach> = {};
  const locations: Record<string, ScheduleLocation> = {};

  included?.forEach((item) => {
    if (item.type === 'course') {
      const cached = classCache.get(item.id);
      const value: ScheduleClass =
        cached ?? {
          id: item.id,
          name: item.attributes.name,
          description: item.attributes.description ?? undefined,
          category: item.attributes.category ?? undefined,
          subcategory: item.attributes.subcategory ?? undefined,
          slug: item.attributes.slug ?? undefined,
        };
      classCache.set(item.id, value);
      classes[item.id] = value;
    }

    if (item.type === 'staff') {
      const displayName = item.attributes.name ?? 'Coach';
      const cached = coachCache.get(item.id);
      let firstName: string | undefined;
      let lastName: string | undefined;
      if (displayName.includes(' ')) {
        const parts = displayName.split(' ');
        firstName = parts.shift();
        lastName = parts.join(' ') || undefined;
      }
      const value: ScheduleCoach =
        cached ?? {
          id: item.id,
          displayName,
          firstName: firstName ?? undefined,
          lastName,
          imageUrl: undefined,
        };
      coachCache.set(item.id, value);
      coaches[item.id] = value;
    }

    if (item.type === 'location') {
      const attrs = item.attributes;
      const cached = locationCache.get(item.id);
      const latLon = parseLatLon(attrs.latLon);
      const value: ScheduleLocation =
        cached ?? {
          id: item.id,
          name: attrs.name ?? 'Location',
          addressLine1: attrs.address ?? undefined,
          addressLine2: attrs.address2 ?? undefined,
          city: attrs.city ?? undefined,
          state: attrs.state ?? undefined,
          postalCode: attrs.postalCode ?? undefined,
          phone: attrs.phone ?? undefined,
          latitude: latLon.latitude,
          longitude: latLon.longitude,
        };
      locationCache.set(item.id, value);
      locations[item.id] = value;
    }
  });

  return { classes, coaches, locations };
};

export const buildSessions = (data: MindbodyClassTime[]): ScheduleSession[] =>
  data.map((item) => {
    const classId = item.relationships.course?.data?.id ?? 'unknown-class';
    const coachId = item.relationships.staff?.data?.id ?? undefined;
    const locationId = item.relationships.location?.data?.id ?? 'unknown-location';

    return {
      id: item.id,
      classId,
      coachId,
      locationId,
      start: item.attributes.startTime,
      end: item.attributes.endTime,
      durationMinutes: item.attributes.duration,
      capacity: item.attributes.capacity,
      openings: item.attributes.webOpenings ?? item.attributes.openings,
      waitlistAvailable: Boolean(item.attributes.waitlistable),
      pricingOptions: buildPurchaseOptions(item.attributes.purchaseOptions ?? undefined),
    } satisfies ScheduleSession;
  });

export const normalizePayload = (response: MindbodyListResponse, params: ScheduleQueryParams): SchedulePayload => {
  const lookups = normalizeIncluded(response.included);

  const classes: Record<string, ScheduleClass> = {};
  const coaches: Record<string, ScheduleCoach> = {};
  const locations: Record<string, ScheduleLocation> = {};

  Object.assign(classes, lookups.classes);
  Object.assign(coaches, lookups.coaches);
  Object.assign(locations, lookups.locations);

  const sessions = buildSessions(response.data);

  return {
    generatedAt: new Date().toISOString(),
    params,
    sessions,
    classes,
    coaches,
    locations,
    fallback: false,
  };
};

export const sanitizeParams = (url: URL): ScheduleQueryParams => {
  const now = new Date();
  const defaultStartUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const fromParam = url.searchParams.get('from') ?? new Date(defaultStartUtc).toISOString();
  const toParam =
    url.searchParams.get('to') ?? new Date(defaultStartUtc + 24 * 60 * 60 * 1000).toISOString();

  const parsedFrom = new Date(fromParam);
  const parsedTo = new Date(toParam);

  if (Number.isNaN(parsedFrom.getTime()) || Number.isNaN(parsedTo.getTime())) {
    throw new Response(JSON.stringify({ error: 'Invalid date range supplied.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (parsedTo <= parsedFrom) {
    throw new Response(JSON.stringify({ error: '`to` must be later than `from`.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const diffDays = (parsedTo.getTime() - parsedFrom.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays > MAX_WINDOW_DAYS) {
    throw new Response(JSON.stringify({ error: `Date range cannot exceed ${MAX_WINDOW_DAYS} days.` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const programId = url.searchParams.get('programId') ?? undefined;
  const coachId = url.searchParams.get('coachId') ?? undefined;

  return {
    from: parsedFrom.toISOString(),
    to: parsedTo.toISOString(),
    programId: programId || undefined,
    coachId: coachId || undefined,
  };
};

const enforceRateLimit = (ip: string, logger: ReturnType<typeof buildLogger>) => {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    logger('warn', 'rate-limit-exceeded', { ip });
    return false;
  }

  bucket.count += 1;
  return true;
};

export const buildMindbodyPayload = (params: ScheduleQueryParams) => ({
  sort: 'start_time',
  page: { size: 100, number: 1 },
  filter: {
    radius: 0,
    startTimeRanges: [
      {
        from: params.from,
        to: params.to,
      },
    ],
    locationSlugs: [LOCATION_SLUG],
    include_dynamic_pricing: true,
    inventory_source: ['MB'],
  },
  include: ['course', 'staff', 'location'],
});

const extractClientIp = (request: Request): string =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  request.headers.get('x-real-ip') ||
  request.headers.get('cf-connecting-ip') ||
  'anonymous';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const requestId = crypto.randomUUID();
  const logger = buildLogger(requestId);
  const startedAt = Date.now();

  let params: ScheduleQueryParams;
  try {
    params = sanitizeParams(url);
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    logger('error', 'param-validation-error', { error: (error as Error).message });
    return new Response(JSON.stringify({ error: 'Invalid request parameters.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const clientIp = extractClientIp(request);
  if (!enforceRateLimit(clientIp, logger)) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please slow down.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildMindbodyPayload(params)),
    });

    if (!response.ok) {
      logger('warn', 'mindbody-non-200', { status: response.status });
      return new Response(
        JSON.stringify({
          fallback: true,
          error: 'Mindbody service unavailable. Loading widget fallback.',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const json = (await response.json()) as MindbodyListResponse;
    const payload = normalizePayload(json, params);

    logger('info', 'mindbody-success', {
      durationMs: Date.now() - startedAt,
      sessions: payload.sessions.length,
    });

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': CACHE_CONTROL_HEADER,
      },
    });
  } catch (error) {
    logger('error', 'mindbody-fetch-error', {
      error: (error as Error).message,
    });
    return new Response(
      JSON.stringify({
        fallback: true,
        error: 'Mindbody request failed. Loading widget fallback.',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
