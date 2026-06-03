# Troubleshooting

## E2E tests (Playwright)

### Missing Playwright browser dependencies

**Symptom:** Running `pnpm test:e2e` fails with an error similar to:

```
Error: browserType.launch: Executable doesn't exist at ...
```

**Cause:** Playwright requires its own browser binaries, which are not installed automatically by `pnpm install`.

**Fix:** Install the browsers manually before running the tests:

```sh
pnpm playwright install
```

To also install the OS-level dependencies (required on some Linux environments):

```sh
pnpm playwright install --with-deps
```

---

### Flaky tests due to concurrency with the dev server

**Symptom:** E2E tests fail intermittently with errors like element not found, network request timing out, or assertions firing before the page is ready.

**Cause:** The Playwright config uses the dev server (`pnpm dev`) as the web server. The Vite dev server compiles and serves modules on demand, which means the first page load can be slower and network requests may still be in flight when Playwright starts asserting.

**Fix:** Wait for both the DOM to be ready and the network to be idle before interacting with the page. Use `waitUntil: 'networkidle'` on navigation calls:

```ts
await page.waitForLoadState('domcontentloaded');
await page.waitForLoadState('networkidle');
// or
await page.goto('/', { waitUntil: 'networkidle' });
```

Or wait for a specific element that signals the page has fully rendered before proceeding with assertions:

```ts
await page.waitForSelector('[data-testid="hero-section"]');
```

> **Note:** This issue only affects the dev environment. Running Playwright against a production build (`pnpm build && pnpm preview`) eliminates the concurrency problem entirely, since all assets are pre-compiled and served statically.
