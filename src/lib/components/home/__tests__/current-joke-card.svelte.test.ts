import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { tick } from 'svelte';
import type { Joke } from '$lib/types/chuck-norris';
import CurrentJokeCard from '$lib/components/home/current-joke-card.svelte';

let mockGetRandomJoke: ReturnType<typeof vi.fn>;

vi.mock('$lib/services/chuck-norris-api', () => ({
  ChuckNorrisApi: vi.fn(class {
     getRandomJoke = mockGetRandomJoke;
  })
}));

vi.mock('$lib/utils/share', () => ({
  shareLink: vi.fn(),
}));

const mockJoke: Joke = {
  id: '1',
  value: 'Chuck Norris can divide by zero.',
  url: 'https://example.com/jokes/1',
  icon_url: '',
  categories: [],
  created_at: '2020-01-01',
  updated_at: '2020-01-01',
};

const anotherMockJoke: Joke = {
  id: '2',
  value: 'Chuck Norris counted to infinity. Twice.',
  url: 'https://example.com/jokes/2',
  icon_url: '',
  categories: [],
  created_at: '2020-01-01',
  updated_at: '2020-01-01',
};

import { shareLink } from '$lib/utils/share';


beforeEach(() => {
  mockGetRandomJoke = vi.fn().mockResolvedValue(anotherMockJoke);
  vi.mocked(shareLink).mockReset();
});

describe('CurrentJokeCard', () => {
  describe('when displaying a joke', () => {
    it('renders the joke text', async () => {
      render(CurrentJokeCard, { initialJoke: mockJoke });

      await expect.element(page.getByText('Chuck Norris can divide by zero.')).toBeInTheDocument();
    });

    it('renders both action buttons enabled by default', async () => {
      render(CurrentJokeCard, { initialJoke: mockJoke });

      await expect.element(page.getByRole('button', { name: /new joke/i })).not.toBeDisabled();
      await expect.element(page.getByRole('button', { name: /share joke/i })).not.toBeDisabled();
    });
  });

  describe('while loading a new joke', () => {
    it('shows "Loading..." on the new joke button', async () => {
      let resolve!: (joke: Joke) => void;
      mockGetRandomJoke.mockReturnValue(new Promise<Joke>(r => (resolve = r)));
      render(CurrentJokeCard, { initialJoke: mockJoke });

      await page.getByRole('button', { name: /new joke/i }).click();

      await expect
        .element(page.getByRole('button', { name: /loading\.\.\./i }))
        .toBeInTheDocument();

      resolve(anotherMockJoke);
    });

    it('disables the "New Joke" button', async () => {
      let resolve!: (joke: Joke) => void;

      mockGetRandomJoke.mockReturnValue(new Promise<Joke>(r => (resolve = r)));
      render(CurrentJokeCard, { initialJoke: mockJoke });

      await page.getByRole('button', { name: /new joke/i }).click();

      await expect.element(page.getByRole('button', { name: /loading\.\.\./i })).toBeDisabled();

      resolve(anotherMockJoke);
    });

    it('disables the "Share Joke" button', async () => {
      let resolve!: (joke: Joke) => void;

      mockGetRandomJoke.mockReturnValue(new Promise<Joke>(r => (resolve = r)));
      render(CurrentJokeCard, { initialJoke: mockJoke });

      await page.getByRole('button', { name: /new joke/i }).click();

      await expect.element(page.getByRole('button', { name: /share joke/i })).toBeDisabled();

      resolve(anotherMockJoke);
    });

    it('does not show "New Joke" label while loading', async () => {
      let resolve!: (joke: Joke) => void;

      mockGetRandomJoke.mockReturnValue(new Promise<Joke>(r => (resolve = r)));
      render(CurrentJokeCard, { initialJoke: mockJoke });

      await page.getByRole('button', { name: /new joke/i }).click();

      await expect
        .element(page.getByRole('button', { name: /^new joke$/i }))
        .not.toBeInTheDocument();

      resolve(anotherMockJoke);
    });
  });

  describe('when user clicks "New Joke"', () => {
    it('fetches and displays a new joke', async () => {
      render(CurrentJokeCard, { initialJoke: mockJoke });

      await page.getByRole('button', { name: /new joke/i }).click();
      await tick();

      expect(mockGetRandomJoke).toHaveBeenCalledOnce();

      await expect
        .element(page.getByText('Chuck Norris counted to infinity. Twice.'))
        .toBeInTheDocument();
    });
  });

  describe('when user clicks "Share Joke"', () => {
    it('calls shareLink with the current joke URL', async () => {
      render(CurrentJokeCard, { initialJoke: mockJoke });

      await page.getByRole('button', { name: /share joke/i }).click();
      await tick();

      expect(shareLink).toHaveBeenCalledWith(mockJoke.url);
    });
  });
});
