import type { APIRoute } from 'astro';
import {
  isValid,
  sanitizeValue,
  validateContactForm,
  type ContactFormErrors,
} from '../../utils/contactValidation';

const FORM_ENDPOINT = import.meta.env.FORMSPREE_CONTACT_ENDPOINT ?? '';

const makeRedirect = (params: URLSearchParams) =>
  new Response(null, {
    status: 303,
    headers: {
      Location: `/contact?${params.toString()}`,
    },
  });

const toUrlParams = (
  status: 'success' | 'error',
  extras: Record<string, string | undefined> = {}
) => {
  const params = new URLSearchParams({ status });
  Object.entries(extras).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return params;
};

const serializeErrors = (errors: ContactFormErrors) => {
  const fieldKeys = Object.keys(errors);
  return {
    fields: fieldKeys.join(',') || undefined,
  };
};

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const payload = {
    name: sanitizeValue(formData.get('name')),
    email: sanitizeValue(formData.get('email')),
    phone: sanitizeValue(formData.get('phone')),
    message: sanitizeValue(formData.get('message')),
  };

  const errors = validateContactForm(payload);
  if (!isValid(errors)) {
    const params = toUrlParams('error', {
      reason: 'validation',
      ...serializeErrors(errors),
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? '',
      message: payload.message,
    });
    return makeRedirect(params);
  }

  if (!FORM_ENDPOINT) {
    const params = toUrlParams('error', { reason: 'not-configured' });
    return makeRedirect(params);
  }

  const upstreamPayload = new FormData();
  upstreamPayload.set('name', payload.name);
  upstreamPayload.set('email', payload.email);
  upstreamPayload.set('message', payload.message);
  if (payload.phone) upstreamPayload.set('phone', payload.phone);
  upstreamPayload.set('source', 'contact-page');

  try {
    const upstreamResponse = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: upstreamPayload,
    });

    if (!upstreamResponse.ok) {
      const params = toUrlParams('error', { reason: 'upstream' });
      return makeRedirect(params);
    }
  } catch (error) {
    console.error('[contact-form] submission failed', error);
    const params = toUrlParams('error', { reason: 'network' });
    return makeRedirect(params);
  }

  return makeRedirect(toUrlParams('success'));
};

export function GET() {
  return new Response(null, {
    status: 405,
    headers: { Allow: 'POST' },
  });
}
