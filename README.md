# Playwright CAPTCHA Solve

Small Playwright test suite demonstrating API-style tests for Google Search using TypeScript and a tiny Page Object Model for the Google Custom Search API.

## Quick start

Prerequisites:
- Node.js >= 18
- npm

Install dependencies:

```powershell
npm install
```

Create a `.env` in the project root from `.env.example` and set the following environment variables:

- `GOOGLE_API_KEY` — your Google API key
- `GOOGLE_CX` — your Custom Search Engine ID (programmable search engine)

Do not commit `.env` — it is listed in `.gitignore`.

## Run the API test (single spec)

From PowerShell (the command I used to run the spec locally):

```powershell
$env:CI='false'; npx playwright test tests/google-search-api-pom.spec.ts --reporter=list
```

Or run the whole test suite (headless):

```powershell
npm test
```

## Project skeleton

```Playwright-captcha-solve/
├── node_modules/
├── pages/
│ └── GoogleSearchAPI.ts
├── playwright-report/
├── test-results/
├── tests/
│ └── google-search-api-pom.spec.ts
├── .env
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── README.md```

1) Create or choose a Google Cloud project and enable the Custom Search API

- Go to Google Cloud Console: https://console.cloud.google.com/
- Create a new project or select an existing project.
- From the left menu go to "APIs & Services" → "Library" and search for "Custom Search API" (also called "Programmable Search Engine API").
- Click "Enable" to enable the API for your project.

2) Create an API key

- In the Cloud Console, go to "APIs & Services" → "Credentials".
- Click "Create Credentials" → "API key".
- Copy the generated key and store it in your local `.env` as `GOOGLE_API_KEY`.
- (Recommended) Restrict the key to the Custom Search API and to your usage (HTTP referrers or IPs) in the key's settings.

3) Create a Custom Search Engine (get `cx`)

- Go to Programmable Search Engine: https://programmablesearchengine.google.com/
- Click "Add" to create a new search engine. For testing across the whole web, set the "Sites to search" to `www.google.com` or any site you want to prioritize; you can also choose "Search the entire web" for broad results (note: some options vary by account).
- After creating the search engine, go to its control panel and get the "Search engine ID" — this is your `cx` value.

4) Put the two values in `.env` like this (DO NOT COMMIT):

```ini
GOOGLE_API_KEY=your-api-key-here
GOOGLE_CX=your-search-engine-id-here
```

## Git hooks and secret scanning

This repo includes a simple pre-commit secret scanner and a `.githooks/pre-commit` hook.

Enable the hooks locally with:

```powershell
npm run setup-git-hooks
```

You can also run the checker manually:

```powershell
npm run check-secrets
```

## Notes and recommendations

- Keep credentials out of source control. Use environment variables or CI secrets.
- Use `GOOGLE_API_KEY` and `GOOGLE_CX` from your CI provider secrets to run tests in CI.
- If you want stronger secret scanning or auditing, consider integrating tools like `detect-secrets` (Yelp) or `git-secrets`.

## License

MIT


Design notes:
- Tests should import POM wrappers from `pages/` to keep assertions and interactions small and test-focused.
- API wrappers must be lightweight and return plain JSON/typed objects — tests assert on returned shapes.
- Keep secrets out of source control; use `.env` for local development and CI secrets for remote runs.
- Add unit tests for any complex parsing logic inside POMs to keep UI tests fast and reliable