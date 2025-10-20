import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { GET } from '../../src/pages/api/schedule';

const fixturePath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../fixtures/mindbody/success.json'
);
const fixture = JSON.parse(readFileSync(fixturePath, 'utf-8'));

describe('/api/schedule integration', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns normalized payload when upstream succeeds', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(fixture), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const request = new Request(
      'https://example.com/api/schedule?from=2025-10-19T04:00:00.000Z&to=2025-10-19T08:00:00.000Z'
    );

    const response = await GET({ request });
    expect(response.status).toBe(200);

    const body = JSON.parse(await response.text());
    expect(body.fallback).toBe(false);
    expect(body.sessions).toHaveLength(1);
    expect(body.classes['9089424'].name).toBe('Women Lace Up Too');
  });

  it('returns fallback when upstream fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response('service unavailable', { status: 502 })
    );

    const request = new Request(
      'https://example.com/api/schedule?from=2025-10-19T04:00:00.000Z&to=2025-10-19T08:00:00.000Z'
    );

    const response = await GET({ request });
    expect(response.status).toBe(503);
    const body = JSON.parse(await response.text());
    expect(body.fallback).toBe(true);
  });

  it('handles fetch rejection gracefully', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network blip'));

    const request = new Request(
      'https://example.com/api/schedule?from=2025-10-19T04:00:00.000Z&to=2025-10-19T08:00:00.000Z'
    );

    const response = await GET({ request });
    expect(response.status).toBe(503);
    const body = JSON.parse(await response.text());
    expect(body.fallback).toBe(true);
  });
});
