import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import type { Joke } from '$lib/types/chuck-norris';
import HomeCategoriesSection from '$lib/components/home/home-categories-section.svelte';

const mockGetJokeByCategory = vi.hoisted(() => vi.fn());

vi.mock('$lib/services/chuck-norris-api', () => ({
  ChuckNorrisApi: vi.fn(class {
    getJokeByCategory = mockGetJokeByCategory;
  })
}));

const makeJoke = (id: string, value: string): Joke => ({
  id,
  value,
  url: `https://example.com/jokes/${id}`,
  icon_url: '',
  categories: ['science'],
  created_at: '2020-01-01',
  updated_at: '2020-01-01',
});

describe('HomeCategoriesSection', () => {
  afterEach(() => vi.clearAllMocks());

  describe('when rendered with categories', () => {
    beforeEach(() => {
      mockGetJokeByCategory.mockResolvedValue(makeJoke('j1', 'A joke'));
    });

    it('renders all category buttons', async () => {
      render(HomeCategoriesSection, { categories: ['science', 'sport', 'history'] });

      await expect.element(page.getByRole('button', { name: /science/ })).toBeInTheDocument();
      await expect.element(page.getByRole('button', { name: /sport/ })).toBeInTheDocument();
      await expect.element(page.getByRole('button', { name: /history/ })).toBeInTheDocument();
    });

    it('shows the section heading', async () => {
      render(HomeCategoriesSection, { categories: [] });

      await expect
        .element(page.getByRole('heading', { name: /explore jokes by categories/i }))
        .toBeInTheDocument();
    });

    it('does not show a jokes list before any category is selected', async () => {
      const { container } = render(HomeCategoriesSection, { categories: ['science'] });

      expect(container.querySelector('h3')).toBeNull();
    });
  });

  describe('when user clicks a category', () => {
    beforeEach(() => {
      mockGetJokeByCategory.mockResolvedValue(makeJoke('j1', 'A science joke'));
    });

    it('marks the category button as selected', async () => {
      render(HomeCategoriesSection, { categories: ['science'] });

      await page.getByRole('button', { name: /science/ }).click();

      await vi.waitFor(async () => {
        await expect
          .element(page.getByRole('button', { name: /science/ }))
          .toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('loads and renders jokes for the selected category', async () => {
      render(HomeCategoriesSection, { categories: ['science'] });

      await page.getByRole('button', { name: /science/ }).click();

      await vi.waitFor(async () => {
        await expect.element(page.getByText('A science joke')).toBeInTheDocument();
      });
    });

    it('shows the category name as a section heading', async () => {
      render(HomeCategoriesSection, { categories: ['science'] });

      await page.getByRole('button', { name: /science/ }).click();

      await vi.waitFor(async () => {
        await expect.element(page.getByRole('heading', { name: /science/i, level: 3 })).toBeInTheDocument();
      });
    });

    it('calls the API with the selected category', async () => {
      render(HomeCategoriesSection, { categories: ['sport'] });

      await page.getByRole('button', { name: /sport/ }).click();

      await vi.waitFor(() => {
        expect(mockGetJokeByCategory).toHaveBeenCalledWith('sport');
      });
    });
  });

  describe('when user clicks the already selected category again', () => {
    beforeEach(() => {
      mockGetJokeByCategory.mockResolvedValue(makeJoke('j1', 'A science joke'));
    });

    it('deselects the category (aria-pressed back to false)', async () => {
      render(HomeCategoriesSection, { categories: ['science'] });

      await page.getByRole('button', { name: /science/ }).click();
      await vi.waitFor(async () => {
        await expect
          .element(page.getByRole('button', { name: /science/ }))
          .toHaveAttribute('aria-pressed', 'true');
      });

      await page.getByRole('button', { name: /science/ }).click();

      await expect
        .element(page.getByRole('button', { name: /science/ }))
        .toHaveAttribute('aria-pressed', 'false');
    });

    it('hides the jokes list', async () => {
      render(HomeCategoriesSection, { categories: ['science'] });

      await page.getByRole('button', { name: /science/ }).click();
      await vi.waitFor(async () => {
        await expect.element(page.getByText('A science joke')).toBeInTheDocument();
      });

      await page.getByRole('button', { name: /science/ }).click();

      await expect.element(page.getByText('A science joke')).not.toBeInTheDocument();
    });
  });

  describe('when the API returns an error', () => {
    beforeEach(() => {
      mockGetJokeByCategory.mockRejectedValue(new Error('API error'));
    });

    it('hides the loading indicator after the error', async () => {
      render(HomeCategoriesSection, { categories: ['science'] });

      await page.getByRole('button', { name: /science/ }).click();

      await vi.waitFor(async () => {
        await expect.element(page.getByText('Loading jokes...')).not.toBeInTheDocument();
      });
    });

    it('shows 0 jokes loaded after the error', async () => {
      render(HomeCategoriesSection, { categories: ['science'] });

      await page.getByRole('button', { name: /science/ }).click();

      await vi.waitFor(async () => {
        await expect.element(page.getByText('0 jokes loaded')).toBeInTheDocument();
      });
    });
  });

  describe('when there are more jokes to load', () => {
    beforeEach(() => {
      mockGetJokeByCategory.mockResolvedValue(makeJoke('j1', 'A science joke'));
    });

    it('shows the "Load more jokes" button after initial load', async () => {
      render(HomeCategoriesSection, { categories: ['science'] });

      await page.getByRole('button', { name: /science/ }).click();

      await vi.waitFor(async () => {
        await expect
          .element(page.getByRole('button', { name: /load more jokes/i }))
          .toBeInTheDocument();
      });
    });

    it('calls the API again when "Load more jokes" is clicked', async () => {
      render(HomeCategoriesSection, { categories: ['science'] });

      await page.getByRole('button', { name: /science/ }).click();

      await vi.waitFor(async () => {
        await expect
          .element(page.getByRole('button', { name: /load more jokes/i }))
          .toBeInTheDocument();
      });

      const callsBefore = mockGetJokeByCategory.mock.calls.length;

      await page.getByRole('button', { name: /load more jokes/i }).click();

      await vi.waitFor(() => {
        expect(mockGetJokeByCategory.mock.calls.length).toBeGreaterThan(callsBefore);
      });
    });
  });
});
