# SkyBook source and deployment evidence

Revision: 09 October 2026  
Live prototype: https://skybook-vn.netlify.app/

## Included folders

- `SkyBook_Web_Source/`: snapshot of the files publicly served by the Netlify deployment on 09 October 2026. It contains the main page, JavaScript, styles, QR library, payment demo and image assets.
- `Prepared_Supabase_Integration/SkyBook_Supabase_Integration/`: prepared PostgreSQL schema, RLS/RPC design, adapter, local rehearsal pages and automated client tests. This package is not connected to the live Netlify site.

## Run the deployed-source snapshot locally

From `SkyBook_Web_Source/`, start a static server:

```bash
python -m http.server 8000
```

Open `http://127.0.0.1:8000/`.

## Run the prepared integration tests

From `Prepared_Supabase_Integration/SkyBook_Supabase_Integration/`:

```bash
node --test tests/*.test.mjs
node rehearsal-checks.mjs
```

Recorded result: 26 client tests passed and 8 local rehearsal event checks passed. These tests use mocked RPC, pure validation or in-memory state. They do not prove a live PostgreSQL migration, RLS, external Inventory, Payment Gateway, Notification service or database persistence.

## Verified implementation boundary

- The deployed Netlify site supports sample flight search, selection, simulated payment and a demo booking confirmation flow.
- A browser smoke run recorded 4 passed checks for the UI flow.
- Booking state in the deployed snapshot is held in page memory. Reloading clears the demo booking.
- Payment, ticketing, Inventory hold/commit, PNR and notifications are simulated or represented as target design.
- The Supabase integration package is prepared code. No project URL, publishable key, password, service-role key, JWT or real passenger data is included.

## Repository link

The team has not supplied a GitHub/SVN repository URL for this submission package. Add the verified URL to `SOURCE_REPOSITORY_LINK.txt` before LMS upload if the course requires a repository link. Do not invent a link or expose private credentials.
