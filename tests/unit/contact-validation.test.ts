import { describe, it, expect } from 'vitest';

import {
  validateContactForm,
  isValid,
  sanitizeValue,
  type ContactFormValues,
} from '../../src/utils/contactValidation';

const buildValues = (overrides: Partial<ContactFormValues> = {}): ContactFormValues => ({
  name: 'Taylor Strong',
  email: 'taylor@example.com',
  phone: '201-555-1234',
  message: 'Interested in a 1:1 training session next week.',
  ...overrides,
});

describe('contact form validation', () => {
  it('returns no errors for valid payloads', () => {
    const result = validateContactForm(buildValues());

    expect(result).toEqual({});
    expect(isValid(result)).toBe(true);
  });

  it('flags missing required fields', () => {
    const result = validateContactForm(
      buildValues({ name: '', email: '', message: 'short', phone: '' })
    );

    expect(result.name).toBeDefined();
    expect(result.email).toBe('Please enter your email address.');
    expect(result.message).toBe('Message should be at least 10 characters.');
    expect(isValid(result)).toBe(false);
  });

  it('validates email and phone formats', () => {
    const result = validateContactForm(
      buildValues({ email: 'invalid-email', phone: 'abc', message: 'This is a valid message.' })
    );

    expect(result.email).toBe('Enter a valid email address.');
    expect(result.phone).toBe('Enter a valid phone number or leave it blank.');
  });

  it('ignores empty optional phone field', () => {
    const result = validateContactForm(buildValues({ phone: '' }));

    expect(result.phone).toBeUndefined();
    expect(isValid(result)).toBe(true);
  });
});

describe('sanitizeValue', () => {
  it('trims whitespace and handles nullish values safely', () => {
    expect(sanitizeValue('   hello  ')).toBe('hello');
    expect(sanitizeValue(null)).toBe('');
    expect(sanitizeValue(undefined)).toBe('');
  });
});
