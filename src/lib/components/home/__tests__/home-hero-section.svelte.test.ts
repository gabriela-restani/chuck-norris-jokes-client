import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { tick } from 'svelte';
import type { Joke } from '$lib/types/chuck-norris';
import HomeHeroSection from '$lib/components/home/home-hero-section.svelte';

vi.mock('$lib/services/chuck-norris-api', () => ({
  ChuckNorrisApi: vi.fn(
    class {
      getJokeByCategory = vi.fn().mockResolvedValue({
        id: '2',
        value: 'Chuck Norris counted to infinity. Twice.',
        url: 'https://example.com/jokes/2',
        icon_url: '',
        categories: [],
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
      });
    },
  ),
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

describe('HomeHeroSection', () => {
  describe('when rendered', () => {
    it('renders the "Chuck Norris" heading', async () => {
      render(HomeHeroSection, { initialJoke: mockJoke, onSearch: vi.fn() });

      await expect
        .element(page.getByRole('heading', { name: /chuck norris/i }))
        .toBeInTheDocument();
    });

    it('renders the "Jokes" text', async () => {
      render(HomeHeroSection, { initialJoke: mockJoke, onSearch: vi.fn() });

      await expect.element(page.getByText('Jokes')).toBeInTheDocument();
    });

    it('renders the current joke text', async () => {
      render(HomeHeroSection, { initialJoke: mockJoke, onSearch: vi.fn() });

      await expect.element(page.getByText('Chuck Norris can divide by zero.')).toBeInTheDocument();
    });

    it('renders the search input', async () => {
      render(HomeHeroSection, { initialJoke: mockJoke, onSearch: vi.fn() });

      await expect.element(page.getByRole('searchbox')).toBeInTheDocument();
    });
  });

  describe('when user submits the search form', () => {
    it('calls onSearch with the typed query', async () => {
      const onSearch = vi.fn();
      render(HomeHeroSection, { initialJoke: mockJoke, onSearch });

      await page.getByRole('searchbox').fill('karate');
      await page.getByRole('button', { name: /^search$/i }).click();
      await tick();
      expect(onSearch).toHaveBeenCalledWith('karate');
    });
  });

  describe('when the window width is less than 1024px (mobile)', () => {
    let originalInnerWidth: number;

    beforeEach(() => {
      originalInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', {
        value: 768,
        writable: true,
        configurable: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        value: originalInnerWidth,
        writable: true,
        configurable: true,
      });
    });

    it('renders the left side of the star divider', async () => {
      render(HomeHeroSection, { initialJoke: mockJoke, onSearch: vi.fn() });

      await tick();

      await expect.element(page.getByTestId('left-divider').first()).toBeInTheDocument();
    });
  });

  describe('when the window width is 1024px or wider (desktop)', () => {
    let originalInnerWidth: number;

    beforeEach(() => {
      originalInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', {
        value: 1280,
        writable: true,
        configurable: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        value: originalInnerWidth,
        writable: true,
        configurable: true,
      });
    });

    it('does not render the left side of the star divider', async () => {
      render(HomeHeroSection, { initialJoke: mockJoke, onSearch: vi.fn() });

      await tick();
      await expect
        .element(page.getByTestId('ui-star-divider').first().getByTestId('left-divider'))
        .not.toBeInTheDocument();
    });
  });
});
