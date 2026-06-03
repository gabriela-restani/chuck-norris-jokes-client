import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import SearchForm from '$lib/components/home/search-form.svelte';

describe('SearchForm', () => {
  describe('when rendered', () => {
    it('renders a search input', async () => {
      render(SearchForm, { onSearch: vi.fn() });

      await expect.element(page.getByRole('searchbox')).toBeInTheDocument();
    });

    it('renders a submit button', async () => {
      render(SearchForm, { onSearch: vi.fn() });

      await expect.element(page.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('starts with an empty input', async () => {
      render(SearchForm, { onSearch: vi.fn() });

      await expect.element(page.getByRole('searchbox')).toHaveValue('');
    });
  });

  describe('when user submits with a typed query', () => {
    it('calls onSearch with the query value', async () => {
      const onSearch = vi.fn();
      render(SearchForm, { onSearch });

      await page.getByRole('searchbox').fill('karate');
      await page.getByRole('button', { name: /search/i }).click();

      expect(onSearch).toHaveBeenCalledWith('karate');
    });

    it('calls onSearch exactly once per submission', async () => {
      const onSearch = vi.fn();
      render(SearchForm, { onSearch });

      await page.getByRole('searchbox').fill('texas');
      await page.getByRole('button', { name: /search/i }).click();

      expect(onSearch).toHaveBeenCalledOnce();
    });
  });

  describe('when user submits without typing anything', () => {
    it('calls onSearch with an empty string', async () => {
      const onSearch = vi.fn();
      render(SearchForm, { onSearch });

      await page.getByRole('button', { name: /search/i }).click();

      expect(onSearch).toHaveBeenCalledWith('');
    });
  });
});
