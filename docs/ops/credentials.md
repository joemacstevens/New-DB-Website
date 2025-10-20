# Credential Inventory

## External Services

| Service            | Identifier                                  | Location                      | Owner            | Notes                                    |
|--------------------|----------------------------------------------|-------------------------------|------------------|------------------------------------------|
| Formspree          | https://formspree.io/f/meorddjj              | Vercel env `FORMSPREE_ENDPOINT` | Product/Marketing | Contact form submissions                  |
| Google Reviews API | API Key ending `...WQg`                     | Vercel env `GOOGLE_REVIEWS_API_KEY` | Operations       | Used for Google Business reviews fetch    |
| Google Maps        | Place ID `ChIJ4cXp53TxwokRbsblNOMH5mk`       | Vercel env `MAPS_PLACE_ID`       | Operations       | Used for map embed and directions         |

## Management Notes
- Credentials stored as Vercel environment variables for Preview/Production.
- `.env.example` contains placeholders for local development configuration.
- Rotate Google API key per security policy; revoke unused keys promptly.
