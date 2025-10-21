import { describe, it, expect } from 'vitest';

import {
  infoCards,
  steps,
  coachHighlights,
  testimonials,
} from '../../src/content/personalTraining';

describe('personal training content', () => {
  it('exposes three info cards with titles and descriptions', () => {
    expect(infoCards).toHaveLength(3);
    for (const card of infoCards) {
      expect(card.title).toBeTruthy();
      expect(card.description).toBeTruthy();
    }
  });

  it('orders steps sequentially from 1 to 4', () => {
    const numbers = steps.map((step) => step.number);
    expect(numbers).toEqual([1, 2, 3, 4]);
  });

  it('provides the full coach highlight roster with slug and tags', () => {
    expect(coachHighlights.length).toBeGreaterThanOrEqual(12);
    coachHighlights.forEach((coach) => {
      expect(coach.slug).toMatch(/[a-z0-9-]+/);
      expect(Array.isArray(coach.focusTags)).toBe(true);
      expect(coach.image).toBeTruthy();
    });
  });

  it('supplies testimonials with quotes and authors', () => {
    testimonials.forEach((quote) => {
      expect(quote.quote.length).toBeGreaterThan(10);
      expect(quote.author).toBeTruthy();
    });
  });
});
