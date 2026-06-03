import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { tick } from 'svelte';
import type { Joke } from '$lib/types/chuck-norris';
import CategoryJokesList from '$lib/components/home/category-jokes-list.svelte';

const makeJoke = (id: string, value: string): Joke => ({
  id,
  value,
  url: `https://example.com/jokes/${id}`,
  icon_url: '',
  categories: ['general'],
  created_at: '2020-01-01',
  updated_at: '2020-01-01',
});

describe('CategoryJokesList', () => {
  describe('when jokes are loaded', () => {
    it('renders the category heading', async () => {
      render(CategoryJokesList, {
        heading: 'science',
        jokes: [],
        isLoading: false,
        hasMore: false,
        onLoadMore: vi.fn(),
      });

      await expect.element(page.getByRole('heading', { name: /science/i })).toBeInTheDocument();
    });

    it('renders each joke', async () => {
      const jokes = [makeJoke('1', 'First joke'), makeJoke('2', 'Second joke')];
      render(CategoryJokesList, { heading: 'science', jokes, isLoading: false, hasMore: false, onLoadMore: vi.fn() });

      await expect.element(page.getByText('First joke')).toBeInTheDocument();
      await expect.element(page.getByText('Second joke')).toBeInTheDocument();
    });

    it('shows the count of jokes loaded (plural)', async () => {
      const jokes = [makeJoke('1', 'Joke A'), makeJoke('2', 'Joke B')];
      render(CategoryJokesList, { heading: 'science', jokes, isLoading: false, hasMore: false, onLoadMore: vi.fn() });

      await expect.element(page.getByText('2 jokes loaded')).toBeInTheDocument();
    });

    it('shows singular "joke" when only one joke is loaded', async () => {
      render(CategoryJokesList, {
        heading: 'science',
        jokes: [makeJoke('1', 'One joke')],
        isLoading: false,
        hasMore: false,
        onLoadMore: vi.fn(),
      });

      await expect.element(page.getByText('1 joke loaded')).toBeInTheDocument();
    });

    it('shows "0 jokes loaded" when the list is empty', async () => {
      render(CategoryJokesList, { heading: 'science', jokes: [], isLoading: false, hasMore: false, onLoadMore: vi.fn() });

      await expect.element(page.getByText('0 jokes loaded')).toBeInTheDocument();
    });
  });

  describe('while loading', () => {
    it('shows the "Loading jokes..." indicator', async () => {
      render(CategoryJokesList, { heading: 'science', jokes: [], isLoading: true, hasMore: false, onLoadMore: vi.fn() });

      await expect.element(page.getByText('Loading jokes...')).toBeInTheDocument();
    });

    it('does not show the "Load more jokes" button even when hasMore is true', async () => {
      render(CategoryJokesList, { heading: 'science', jokes: [], isLoading: true, hasMore: true, onLoadMore: vi.fn() });

      await expect.element(page.getByRole('button', { name: /load more jokes/i })).not.toBeInTheDocument();
    });
  });

  describe('when not loading', () => {
    it('does not show the "Loading jokes..." indicator', async () => {
      render(CategoryJokesList, { heading: 'science', jokes: [], isLoading: false, hasMore: false, onLoadMore: vi.fn() });

      await expect.element(page.getByText('Loading jokes...')).not.toBeInTheDocument();
    });
  });

  describe('when there are more jokes to load', () => {
    it('shows the "Load more jokes" button', async () => {
      render(CategoryJokesList, {
        heading: 'science',
        jokes: [makeJoke('1', 'Joke')],
        isLoading: false,
        hasMore: true,
        onLoadMore: vi.fn(),
      });

      await expect.element(page.getByRole('button', { name: /load more jokes/i })).toBeInTheDocument();
    });

    it('calls onLoadMore when the button is clicked', async () => {
      const onLoadMore = vi.fn();
      render(CategoryJokesList, {
        heading: 'science',
        jokes: [makeJoke('1', 'Joke')],
        isLoading: false,
        hasMore: true,
        onLoadMore,
      });

      await page.getByRole('button', { name: /load more jokes/i }).click();
      await tick();

      expect(onLoadMore).toHaveBeenCalledOnce();
    });
  });

  describe('when there are no more jokes to load', () => {
    it('does not show the "Load more jokes" button', async () => {
      render(CategoryJokesList, {
        heading: 'science',
        jokes: [makeJoke('1', 'Joke')],
        isLoading: false,
        hasMore: false,
        onLoadMore: vi.fn(),
      });

      await expect.element(page.getByRole('button', { name: /load more jokes/i })).not.toBeInTheDocument();
    });
  });
});
