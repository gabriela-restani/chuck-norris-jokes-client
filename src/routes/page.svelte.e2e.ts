import { expect, test } from '@playwright/test';

const mockFreshJoke = {
  id: 'fresh-joke',
  url: 'https://api.chucknorris.io/jokes/fresh-joke',
  value: 'Chuck Norris refreshed the current joke for the Playwright test.',
  icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
  categories: ['dev'],
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
};

// 25 items to cover the initial load (5) + load more (20) scenarios without duplicate IDs.
const mockCategoryJokes = Array.from({ length: 25 }, (_, index) => ({
  ...mockFreshJoke,
  id: `category-joke-${index}`,
  value: `Category joke ${index + 1} for the Playwright test.`,
}));

const mockSearchResult = {
  total: 1,
  result: [
    {
      ...mockFreshJoke,
      id: 'search-joke',
      value: 'Karate joke from Chuck Norris for the Playwright test.',
      categories: ['movie'],
    },
  ],
};

const fallbackJokeText =
  'Chuck Norris always keeps the API online. The fallback joke is ready for you.';

test.describe('home page', () => {
  test('initial load renders the hero section and categories', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Chuck Norris Jokes' })).toBeVisible();
    await expect(page.getByText('100% american, 100% hilarious, 0% boring.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Joke' })).toBeVisible();
    // The "dev" category is always present: returned by the real API and also used as fallback.
    await expect(page.getByRole('button', { name: /#\s*dev/i })).toBeVisible();
  });

  test('when the user uses the input, it shows the search result', async ({ page }) => {
    await page.route('**/jokes/search**', async (route) => {
      await route.fulfill({ json: mockSearchResult });
    });

    await page.goto('/');
    await page
      .getByPlaceholder('Search for a joke... Ex: Karate, Chuck, Texas, etc.')
      .fill('karate');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('1 result for "karate"')).toBeVisible({ timeout: 15000 });
    await expect(
      page.getByText('Karate joke from Chuck Norris for the Playwright test.'),
    ).toBeVisible({ timeout: 15000 });
  });

  test('when the API returns an error for the search input, it shows no results', async ({
    page,
  }) => {
    await page.route('**/jokes/search**', async (route) => {
      await route.fulfill({ status: 500, body: 'error' });
    });

    await page.goto('/');
    await page
      .getByPlaceholder('Search for a joke... Ex: Karate, Chuck, Texas, etc.')
      .fill('karate');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('No results for "karate"')).toBeVisible({ timeout: 15000 });
  });

  test('when the user clicks New Joke, it refreshes the current joke', async ({ page }) => {
    // The initial joke is loaded server-side (SSR) via +page.ts and is not intercepted by
    // page.route. The first — and only — browser-level request to /jokes/random comes from
    // the "New Joke" button click, so the mock must respond on the very first call.
    await page.route('**/jokes/random**', async (route) => {
      page.on('request', (request) => {
        console.log('BATATA:', request.method(), request.url());
      });

      if (route.request().url().includes('?category=')) {
        await route.continue();
        return;
      }
      await route.fulfill({ json: mockFreshJoke });
    });

    await page.goto('/');
    await page.getByRole('button', { name: 'New Joke' }).click();

    await expect(
      page.getByText('Chuck Norris refreshed the current joke for the Playwright test.'),
    ).toBeVisible({ timeout: 15000 });
  });

  test('when the API returns an error for New Joke, it shows the fallback joke', async ({
    page,
  }) => {
    await page.route('**/jokes/random**', async (route) => {
      page.on('request', (request) => {
        console.log('BATATA:', request.method(), request.url());
      });

      if (route.request().url().includes('?category=')) {
        await route.continue();
        return;
      }
      await route.fulfill({ status: 500, body: 'error' });
    });

    await page.goto('/');
    await page.getByRole('button', { name: 'New Joke' }).click();

    await expect(page.getByText(fallbackJokeText)).toBeVisible({ timeout: 15000 });
  });

  test('when the user clicks a category, it loads that category jokes', async ({ page }) => {
    let categoryCallCount = 0;

    await page.route('**/jokes/random?category=**', async (route) => {
      const joke = mockCategoryJokes[categoryCallCount % mockCategoryJokes.length];
      categoryCallCount += 1;
      await route.fulfill({ json: joke });
    });

    await page.goto('/');
    await page.getByRole('button', { name: /#\s*dev/i }).click();

    await expect(page.getByRole('heading', { name: 'dev' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('5 jokes loaded')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: 'Load more jokes' })).toBeVisible();
  });

  test('when the API returns an error for a category click, it falls back to one joke', async ({
    page,
  }) => {
    await page.route('**/jokes/random?category=**', async (route) => {
      await route.fulfill({ status: 500, body: 'error' });
    });

    await page.goto('/');
    await page.getByRole('button', { name: /#\s*dev/i }).click();

    await expect(page.getByRole('heading', { name: 'dev' })).toBeVisible({ timeout: 15000 });
    // API failures return the same fallback joke (id: 'fallback-joke'), so deduplication
    // collapses all 5 parallel calls into 1 unique joke.
    await expect(page.getByText('1 joke loaded')).toBeVisible({ timeout: 15000 });
  });

  test('when the user clicks Load more and there are new jokes, it adds them to the list', async ({
    page,
  }) => {
    let categoryCallCount = 0;

    await page.route('**/jokes/random?category=**', async (route) => {
      // Each call gets a distinct ID (no modulo) so none are deduplicated.
      await route.fulfill({ json: mockCategoryJokes[categoryCallCount++] });
    });

    await page.goto('/');
    await page.getByRole('button', { name: /#\s*dev/i }).click();

    await expect(page.getByText('5 jokes loaded')).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: 'Load more jokes' }).click();

    // Verify a joke from the second batch (index 5) is now visible in the list.
    await expect(page.getByText(mockCategoryJokes[5].value)).toBeVisible({ timeout: 15000 });
    // hasMore stays true when new unique jokes were added, so the button should still be visible.
    await expect(page.getByRole('button', { name: 'Load more jokes' })).toBeVisible();
  });

  test('when the user clicks Load more and all jokes are duplicates, it hides the Load more button', async ({
    page,
  }) => {
    let categoryCallCount = 0;

    await page.route('**/jokes/random?category=**', async (route) => {
      // Wraps around the first 5 IDs so every load-more response is a duplicate of the initial set.
      await route.fulfill({ json: mockCategoryJokes[categoryCallCount++ % 5] });
    });

    await page.goto('/');
    await page.getByRole('button', { name: /#\s*dev/i }).click();

    await expect(page.getByText('5 jokes loaded')).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: 'Load more jokes' }).click();

    // All 20 load-more responses are duplicates → hasMore becomes false → button disappears.
    await expect(page.getByRole('button', { name: 'Load more jokes' })).not.toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText('5 jokes loaded')).toBeVisible();
  });

  test('when the user clicks an active category again, it deselects it and hides the list', async ({
    page,
  }) => {
    let categoryCallCount = 0;

    await page.route('**/jokes/random?category=**', async (route) => {
      const joke = mockCategoryJokes[categoryCallCount % mockCategoryJokes.length];
      categoryCallCount += 1;
      await route.fulfill({ json: joke });
    });

    await page.goto('/');
    await page.getByRole('button', { name: /#\s*dev/i }).click();

    await expect(page.getByRole('heading', { name: 'dev' })).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /#\s*dev/i }).click();

    await expect(page.getByRole('heading', { name: 'dev' })).not.toBeVisible();
  });
});
