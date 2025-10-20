/**
 * Normalized schedule types returned by `/api/schedule` proxy.
 * These align with Story 1.1 contract and are consumed by front-end components.
 */

/** Query parameters accepted by the schedule proxy. */
export interface ScheduleQueryParams {
  /** ISO8601 date-time inclusive range start (e.g., 2025-10-19T04:00:00.000Z). */
  from: string;
  /** ISO8601 date-time exclusive range end (e.g., 2025-10-20T03:59:59.999Z). */
  to: string;
  /** Optional program identifier (mapped from Mindbody course id/slug). */
  programId?: string;
  /** Optional coach identifier (Mindbody staff id). */
  coachId?: string;
}

/**
 * Top-level payload returned by the proxy. Contains normalized entities and a fallback flag.
 */
export interface SchedulePayload {
  /** ISO timestamp indicating when the response was generated. */
  generatedAt: string;
  /** Echo of the sanitized query parameters used for the request. */
  params: ScheduleQueryParams;
  /** Linear list of session instances grouped by classId/coaches through lookup maps. */
  sessions: ScheduleSession[];
  /** Lookup table of class/course metadata keyed by classId. */
  classes: Record<string, ScheduleClass>;
  /** Lookup table of coach/staff metadata keyed by coachId. */
  coaches: Record<string, ScheduleCoach>;
  /** Lookup table of location metadata keyed by locationId. */
  locations: Record<string, ScheduleLocation>;
  /** Indicates upstream failure; UI should render Mindbody widget when true. */
  fallback: boolean;
}

/** Single scheduled session instance. */
export interface ScheduleSession {
  /** Unique identifier for the session (Mindbody class_time id). */
  id: string;
  /** Identifier referencing `classes` map. Required for UI class name display. */
  classId: string;
  /** Identifier referencing `coaches` map; optional if staff not assigned. */
  coachId?: string;
  /** Identifier referencing `locations` map. */
  locationId: string;
  /** ISO8601 start time (gym local timezone). */
  start: string;
  /** ISO8601 end time. */
  end: string;
  /** Duration in minutes. */
  durationMinutes: number;
  /** Maximum capacity for the session. */
  capacity: number;
  /** Current available openings (web). */
  openings: number;
  /** Whether waitlist is available. */
  waitlistAvailable: boolean;
  /** Pricing options available for the session. */
  pricingOptions: PricingOption[];
}

/** Pricing option metadata used for CTA labeling. */
export interface PricingOption {
  id: string;
  name: string;
  /** Retail price in USD; may be formatted downstream. */
  retail: number | null;
  /** Online price in USD. */
  online: number | null;
  /** Flags that describe the option (package, intro, etc.). */
  isPackage: boolean;
  isIntroOffer: boolean;
  isSingleSession: boolean;
}

/** Class/course level metadata. */
export interface ScheduleClass {
  id: string;
  /** Display name (e.g., "Blue Collar Boxing"). */
  name: string;
  /** Optional program slug or friendly url. */
  slug?: string;
  /** Category (e.g., Boxing / Kickboxing). */
  category?: string;
  /** Subcategory (e.g., Boxing). */
  subcategory?: string;
  /** Short description used in tooltip/cards. */
  description?: string;
}

/** Coach/staff metadata. */
export interface ScheduleCoach {
  id: string;
  /** Full display name for UI (e.g., "Coach Dred"). */
  displayName: string;
  /** Optional first name. */
  firstName?: string;
  /** Optional last name. */
  lastName?: string;
  /** Optional avatar/headshot url. */
  imageUrl?: string;
}

/** Location metadata (gym / studio). */
export interface ScheduleLocation {
  id: string;
  name: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  /** Latitude coordinate for map linking. */
  latitude?: number;
  /** Longitude coordinate for map linking. */
  longitude?: number;
  phone?: string;
}
