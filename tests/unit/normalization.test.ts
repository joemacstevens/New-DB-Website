import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  buildSessions,
  normalizeIncluded,
  sanitizeNumber,
  type MindbodyClassTime,
  type MindbodyListResponse,
} from '../../src/pages/api/schedule';

const fixturePath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../fixtures/mindbody/success.json'
);
const fixture = JSON.parse(readFileSync(fixturePath, 'utf-8')) as MindbodyListResponse;

describe('normalization helpers', () => {
  it('normalizes included entities and caches them', () => {
    const lookups = normalizeIncluded(fixture.included);

    expect(Object.keys(lookups.classes)).toContain('9089424');
    expect(Object.keys(lookups.coaches)).toContain('80191340');
    expect(Object.keys(lookups.locations)).toContain('460952');
    expect(lookups.classes['9089424'].name).toBe('Women Lace Up Too');
  });

  it('creates session entries with pricing metadata', () => {
    const sessions = buildSessions(fixture.data);

    expect(sessions[0]).toMatchObject({
      id: '340788312',
      classId: '9089424',
      locationId: '460952',
    });
    expect(sessions[0].pricingOptions[0]).toMatchObject({
      id: '102200',
      online: 150,
      retail: 150,
    });
  });

  it('handles missing coach and class gracefully', () => {
    const baseSession = structuredClone((fixture.data as MindbodyClassTime[])[0]);
    baseSession.relationships.staff = { data: null };
    baseSession.relationships.course = { data: null };

    const sessions = buildSessions([baseSession]);

    expect(sessions[0].coachId).toBeUndefined();
    expect(sessions[0].classId).toBe('unknown-class');
  });

  it('sanitizes numeric strings safely', () => {
    expect(sanitizeNumber('150.0000')).toBe(150);
    expect(sanitizeNumber('not-a-number')).toBeNull();
    expect(sanitizeNumber(undefined)).toBeNull();
  });
});
