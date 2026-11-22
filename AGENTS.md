# ShopLedger

## Stack
- Node.js CommonJS app; Express 4 serves the browser UI from `public/` and JSON APIs.
- UI uses `public/index.html`, `public/css/style.css`, and `public/js/app.js` (plain HTML, CSS, and JavaScript).
- Runtime dependencies are `express` and `body-parser`; application data is stored in `data/db.json` through `lib/store.js`.

## Module map
- `routes/customers.js` — lists customers and settlements; records Khata settlements.
- `routes/orders.js` — lists, creates, reads, and cancels orders.
- `routes/products.js` — lists/filter products and lists active coupons.
- `routes/reports.js` — dashboard/GST reports, pricing preview, and admin export.
- `lib/coupons.js` — normalizes, validates, calculates, and lists coupons from config.
- `lib/dates.js` — formats today's date, normalizes date keys, and derives fiscal years.
- `lib/inventory.js` — finds products, checks sellable stock, reserves/releases stock, and summarizes inventory.
- `lib/invoice.js` — computes invoice figures and renders printable invoice HTML.
- `lib/ledger.js` — customer balances, Khata order charges/reversals, and settlements.
- `lib/orders.js` — adds, gets, lists, and cancels orders.
- `lib/pricing.js` — computes subtotals, discounts, GST totals, and line breakdowns.
- `lib/reports.js` — dashboard summary and GST reconciliation calculations.
- `lib/store.js` — reads/writes `data/db.json` and appends audit entries.
- `lib/tax.js` — resolves item GST rates/slabs and splits tax into CGST/SGST.

## Commands
- Start the app: `npm start` (`node server.js`, default port 3000).
- Run tests: `node --test`.

## Rules
1. Write characterization tests before changing behaviour.
2. Change only the module(s) the ticket is about.
3. Tests never read or write `data/db.json`; use in-memory data.
4. Add no dependencies.
5. Make the smallest fix that works.

## Current ticket
Invoice total and GST breakdown do not match what the customer was billed. Allowed files: `lib/invoice.js` (`lib/tax.js` only if truly needed).
