import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import UiStarDivider from '$lib/components/ui/ui-star-divider.svelte';

describe('UiStarDivider', () => {
  it('always renders the ★ ★ ★ stars', async () => {
    render(UiStarDivider);
    await expect.element(page.getByText('★ ★ ★')).toBeInTheDocument();
  });

  it('is aria-hidden', async () => {
    const { container } = render(UiStarDivider);
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('hides left divider by default (leftLength="0")', async () => {
    const { container } = render(UiStarDivider);
    const dividers = container.querySelectorAll('[data-testid="left-divider"]');
    expect(dividers.length).toBe(0);
  });

  it('shows right divider by default (rightLength="50px")', async () => {
    const { container } = render(UiStarDivider);
    const rightDivider = container.querySelector('[data-testid="right-divider"]');
    expect(rightDivider).not.toBeNull();
  });

  it('shows left divider when leftLength is non-zero', async () => {
    const { container } = render(UiStarDivider, { leftLength: '100px' });
    const leftDivider = container.querySelector('[data-testid="left-divider"]');
    expect(leftDivider).not.toBeNull();
  });

  it('shows both dividers when both lengths are non-zero', async () => {
    const { container } = render(UiStarDivider, { leftLength: '80px', rightLength: '80px' });
    const dividers = container.querySelectorAll(
      '[data-testid="left-divider"], [data-testid="right-divider"]',
    );
    expect(dividers.length).toBe(2);
  });

  it('hides right divider when rightLength is "0"', async () => {
    const { container } = render(UiStarDivider, { rightLength: '0' });
    const dividers = container.querySelectorAll('[data-testid="right-divider"]');
    expect(dividers.length).toBe(0);
  });

  it('hides right divider when rightLength is "0px"', async () => {
    const { container } = render(UiStarDivider, { rightLength: '0px' });
    const dividers = container.querySelectorAll('[data-testid="right-divider"]');
    expect(dividers.length).toBe(0);
  });

  it('applies custom dividerColor class', async () => {
    const { container } = render(UiStarDivider, {
      rightLength: '50px',
      dividerColor: 'bg-leather-brown-400',
    });

    expect(container.querySelector('[data-testid="right-divider"]')).toHaveClass(
      'bg-leather-brown-400',
    );
  });

  it('applies custom starColor class', async () => {
    const { container } = render(UiStarDivider, { starColor: 'text-deep-blue-600' });

    expect(container.querySelector('[data-testid="star-divider"]')).toHaveClass(
      'text-deep-blue-600',
    );
  });

  it('applies full width by default', async () => {
    const { container } = render(UiStarDivider);
    expect(container.querySelector('[data-testid="ui-star-divider"]')).toHaveClass('w-full');
  });

  it('applies fit width when width="fit"', async () => {
    const { container } = render(UiStarDivider, { width: 'fit' });
    expect(container.querySelector('[data-testid="ui-star-divider"]')).toHaveClass('w-fit');
  });
});
