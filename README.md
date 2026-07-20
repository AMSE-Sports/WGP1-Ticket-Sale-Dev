# WGP#1 Ticket Sale — 2026 Development Copy

This repository is an isolated development copy of `AMSE-Sports/WGP1-Ticket-Sale`.

## Development safeguards

- The original 2025 repository is not modified.
- The 2026 page runs in local development mode.
- Test registrations are stored only in browser `localStorage`.
- The production Supabase table is not used by this copy.
- Ticket dates and prices are draft configuration values in `app.js`.

## Registration flow

1. Each visitor completes an individual registration and privacy acknowledgement.
2. Additional visitors can be added one at a time to the same sale.
3. A handover screen separates the visitor and staff sections.
4. Staff allocate ticket types, verify quantities and record payment.
5. Ticket quantity must equal the number of registered visitors.

Before production launch, configure the confirmed 2026 schedule, prices, staff accounts, Privacy Notice and a separate secured database.
