import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { tick } from 'svelte';
import type { Joke } from '$lib/types/chuck-norris';
import JokeItem from '$lib/components/home/joke-item.svelte';

vi.mock('$lib/utils/share', () => ({
  shareLink: vi.fn().mockResolvedValue(undefined),
}));

import { shareLink } from '$lib/utils/share';

const makeJoke = (overrides: Partial<Joke> = {}): Joke => ({
  id: '1',
  value: 'Chuck Norris can divide by zero.',
  url: 'https://example.com/jokes/1',
  icon_url: '',
  categories: ['science'],
  created_at: '2020-01-01',
  updated_at: '2020-01-01',
  ...overrides,
});

describe('JokeItem', () => {
  describe('when displaying a joke', () => {
    it('renders the joke text', async () => {
      render(JokeItem, { joke: makeJoke() });

      await expect.element(page.getByText('Chuck Norris can divide by zero.')).toBeInTheDocument();
    });

    it('shows the first category as a tag', async () => {
      render(JokeItem, { joke: makeJoke({ categories: ['science'] }) });

      await expect.element(page.getByText('#science')).toBeInTheDocument();
    });

    it('shows "#general" when the joke has no categories', async () => {
      render(JokeItem, { joke: makeJoke({ categories: [] }) });

      await expect.element(page.getByText('#general')).toBeInTheDocument();
    });

    it('renders a "Share joke" button', async () => {
      render(JokeItem, { joke: makeJoke() });

      await expect.element(page.getByRole('button', { name: /share joke/i })).toBeInTheDocument();
    });

    it('renders as a list item', async () => {
      const { container } = render(JokeItem, { joke: makeJoke() });

      expect(container.querySelector('li')).not.toBeNull();
    });
  });

  describe('when a search query matches the joke text', () => {
    it('wraps matching text in a <mark> element', async () => {
      const { container } = render(JokeItem, {
        joke: makeJoke({ value: 'Chuck Norris is amazing.' }),
        query: 'Chuck',
      });

      const mark = container.querySelector('mark');
      expect(mark).not.toBeNull();
      expect(mark!.textContent).toBe('Chuck');
    });

    it('is case-insensitive when highlighting', async () => {
      const { container } = render(JokeItem, {
        joke: makeJoke({ value: 'Chuck Norris is amazing.' }),
        query: 'chuck',
      });

      const mark = container.querySelector('mark');
      expect(mark).not.toBeNull();
    });

    it('highlights all occurrences of the query', async () => {
      const { container } = render(JokeItem, {
        joke: makeJoke({ value: 'Chuck loves Chuck.' }),
        query: 'Chuck',
      });

      const marks = container.querySelectorAll('mark');
      expect(marks.length).toBe(2);
    });
  });

  describe('when no search query is provided', () => {
    it('does not render any <mark> element', async () => {
      const { container } = render(JokeItem, { joke: makeJoke() });

      expect(container.querySelector('mark')).toBeNull();
    });
  });

  describe('when user clicks "Share joke"', () => {
    it('calls shareLink with the joke URL', async () => {
      render(JokeItem, { joke: makeJoke({ url: 'https://example.com/jokes/42' }) });

      await page.getByRole('button', { name: /share joke/i }).click();
      await tick();

      expect(vi.mocked(shareLink)).toHaveBeenCalledWith('https://example.com/jokes/42');
    });
  });
});
