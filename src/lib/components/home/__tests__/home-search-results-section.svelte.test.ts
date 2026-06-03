import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import type { Joke } from '$lib/types/chuck-norris';
import HomeSearchResultsSection from '$lib/components/home/home-search-results-section.svelte';

const makeJoke = (id: string, value: string): Joke => ({
  id,
  value,
  url: `https://example.com/jokes/${id}`,
  icon_url: '',
  categories: [],
  created_at: '2020-01-01',
  updated_at: '2020-01-01',
});

describe('HomeSearchResultsSection', () => {
  describe('while loading', () => {
    it('shows "Searching..." as the heading', async () => {
      render(HomeSearchResultsSection, {
        query: 'karate',
        jokes: [],
        totalResults: 0,
        isLoading: true,
      });

      await expect
        .element(page.getByRole('heading', { name: /searching\.\.\./i }))
        .toBeInTheDocument();
    });

    it('does not show a results count while loading', async () => {
      render(HomeSearchResultsSection, {
        query: 'karate',
        jokes: [],
        totalResults: 0,
        isLoading: true,
      });

      await expect
        .element(page.getByRole('heading', { name: /results for/i }))
        .not.toBeInTheDocument();
    });
  });

  describe('when the search returns no results', () => {
    it('shows "No results for" with the query', async () => {
      render(HomeSearchResultsSection, {
        query: 'xyzabc',
        jokes: [],
        totalResults: 0,
        isLoading: false,
      });

      await expect
        .element(page.getByRole('heading', { name: /no results for "xyzabc"/i }))
        .toBeInTheDocument();
    });
  });

  describe('when the search returns results', () => {
    it('shows the total count and query for multiple results', async () => {
      const jokes = [makeJoke('1', 'First joke'), makeJoke('2', 'Second joke')];
      render(HomeSearchResultsSection, {
        query: 'chuck',
        jokes,
        totalResults: 2,
        isLoading: false,
      });

      await expect
        .element(page.getByRole('heading', { name: /2 results for "chuck"/i }))
        .toBeInTheDocument();
    });

    it('uses singular "result" when totalResults is 1', async () => {
      render(HomeSearchResultsSection, {
        query: 'norris',
        jokes: [makeJoke('1', 'One joke')],
        totalResults: 1,
        isLoading: false,
      });

      await expect
        .element(page.getByRole('heading', { name: /1 result for "norris"/i }))
        .toBeInTheDocument();
    });

    it('renders each joke item', async () => {
      const jokes = [makeJoke('1', 'First joke'), makeJoke('2', 'Second joke')];
      render(HomeSearchResultsSection, {
        query: 'joke',
        jokes,
        totalResults: 2,
        isLoading: false,
      });

      await expect.element(page.getByText('First joke')).toBeInTheDocument();
      await expect.element(page.getByText('Second joke')).toBeInTheDocument();
    });

    it('renders jokes in a list', async () => {
      const jokes = [makeJoke('1', 'A joke'), makeJoke('2', 'Another joke')];
      const { container } = render(HomeSearchResultsSection, {
        query: 'joke',
        jokes,
        totalResults: 2,
        isLoading: false,
      });

      expect(container.querySelectorAll('li').length).toBe(2);
    });
  });
});
