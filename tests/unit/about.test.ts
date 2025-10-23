import { describe, it, expect } from 'vitest';

import {
  heroContent,
  pillars,
  facilityMedia,
  equipmentFeatures,
  communityHighlights,
  aboutTestimonials,
} from '../../src/content/about';

describe('about page content', () => {
  it('provides hero copy and background asset', () => {
    expect(heroContent.heading.length).toBeGreaterThan(5);
    expect(heroContent.background.length).toBeGreaterThan(10);
  });

  it('defines three training pillars with copy and icons', () => {
    expect(pillars).toHaveLength(3);
    pillars.forEach((pillar) => {
      expect(pillar.title).toBeTruthy();
      expect(pillar.description).toBeTruthy();
      expect(pillar.icon).toBeTruthy();
    });
  });

  it('includes facility media covering hero, medium, and small priorities', () => {
    expect(facilityMedia.length).toBeGreaterThanOrEqual(4);
    const priorities = new Set(facilityMedia.map((item) => item.priority));
    expect(priorities.has('hero')).toBe(true);
    expect(priorities.has('medium')).toBe(true);
    expect(priorities.has('small')).toBe(true);
  });

  it('lists equipment features with at least three bullet points each', () => {
    equipmentFeatures.forEach((feature) => {
      expect(feature.bullets.length).toBeGreaterThanOrEqual(3);
      feature.bullets.forEach((bullet) => expect(bullet.length).toBeGreaterThan(5));
    });
  });

  it('exposes community highlights with quotes and authors', () => {
    communityHighlights.forEach((highlight) => {
      expect(highlight.quote.length).toBeGreaterThan(10);
      expect(highlight.author).toBeTruthy();
    });
  });

  it('provides testimonials for proof section', () => {
    expect(aboutTestimonials.length).toBeGreaterThanOrEqual(3);
    aboutTestimonials.forEach((testimonial) => {
      expect(testimonial.quote.length).toBeGreaterThan(10);
      expect(testimonial.author).toBeTruthy();
    });
  });
});
