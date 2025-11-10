# Personal Finance Tracker (Vanilla JS)


A no-build, no-deps personal finance tracker that runs 100% in the browser. Perfect for GitHub Pages. Features custom categories, robust filters, CSV export, and an income vs expense chart.


## Features
- Add **income** & **expenses** with amount, date, category, note
- Create/delete **custom categories** (income or expense)
- **Filter** by type, category, date range, min/max amount
- **Sort** by date or amount (asc/desc)
- **Persistent** data (LocalStorage) across sessions
- **CSV export** for the current filtered view
- **Chart** (optional) showing Income vs Expense
- **Responsive** UI (mobile-first)


## Tech
- Vanilla JavaScript (no framework)
- LocalStorage for persistence
- Chart.js via CDN (optional)
- Plain CSS


## Getting Started
1. Clone this repo.
2. Open `index.html` in a browser.
3. (Optional) Run tests: open `tests.html`.


## Data Model
- `pft_transactions`: Array of `{ id, type, amount, date, categoryId, note, createdAt }`
- `pft_categories`: Array of `{ id, name, type }`


## Tests
Open `tests.html` in a browser to run minimal unit tests for filter & summary utilities.


## Roadmap (Nice-to-haves)
- Edit transactions & categories
- Recurring transactions
- Import CSV
- Currency selector & i18n
- Migrate to React/TypeScript + Vitest
