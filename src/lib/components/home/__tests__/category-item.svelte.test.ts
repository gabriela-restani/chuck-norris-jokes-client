import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { tick } from 'svelte';
import CategoryItem from '$lib/components/home/category-item.svelte';

describe('CategoryItem', () => {
  describe('when not selected', () => {
    it('renders the category label inside a button', async () => {
      render(CategoryItem, { category: 'science', isSelected: false, onclick: vi.fn() });
      await expect.element(page.getByRole('button', { name: /science/ })).toBeInTheDocument();
    });

    it('sets aria-pressed to false', async () => {
      render(CategoryItem, { category: 'science', isSelected: false, onclick: vi.fn() });
      await expect.element(page.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('when selected', () => {
    it('sets aria-pressed to true', async () => {
      render(CategoryItem, { category: 'science', isSelected: true, onclick: vi.fn() });
      await expect.element(page.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('when user clicks the category', () => {
    it('calls the onclick handler', async () => {
      const onclick = vi.fn();
      render(CategoryItem, { category: 'science', isSelected: false, onclick });

      await page.getByRole('button').click();
      await tick();

      expect(onclick).toHaveBeenCalledOnce();
    });

    it('does not call onclick when rendered without interaction', async () => {
      const onclick = vi.fn();
      render(CategoryItem, { category: 'science', isSelected: false, onclick });

      expect(onclick).not.toHaveBeenCalled();
    });
  });
});
