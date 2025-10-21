export type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const emailPattern =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;
const phonePattern = /^[+()\-.\s\d]{7,}$/;

export function sanitizeValue(value: FormDataEntryValue | null | undefined): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone?.trim() ?? '';
  const message = values.message.trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (phone && !phonePattern.test(phone)) {
    errors.phone = 'Enter a valid phone number or leave it blank.';
  }

  if (!message) {
    errors.message = 'Let us know how we can help.';
  } else if (message.length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }

  return errors;
}

export function isValid(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
