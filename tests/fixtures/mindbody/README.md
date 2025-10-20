# Mindbody Fixture Data

These fixtures are sanitized responses from the Mindbody Marketing API `search/class_times` endpoint.

- `success.json` – standard payload with course, staff, and location entries included.

## Updating Fixtures
1. Fetch new data from Mindbody using a test window (via Postman or curl).
2. Strip any personally identifiable information or unused fields.
3. Replace values such as image URLs with generic placeholders if needed.
4. Save as prettified JSON and ensure the structure matches the API contract used in tests.
5. Run `pnpm test` to confirm the fixtures remain valid.
