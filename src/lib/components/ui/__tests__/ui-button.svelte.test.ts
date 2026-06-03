import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { createRawSnippet } from 'svelte';
import UiButton from '$lib/components/ui/ui-button.svelte';

function makeSnippet(text: string) {
  return createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));
}

describe('UiButton', () => {
  it('renders a button element with the correct children content', async () => {
    render(UiButton, { children: makeSnippet('Click') });
    await expect.element(page.getByRole('button')).toBeInTheDocument();
    await expect.element(page.getByRole('button')).toHaveTextContent('Click');
  });

  it('is enabled by default', async () => {
    render(UiButton, { children: makeSnippet('Button') });
    await expect.element(page.getByRole('button')).not.toBeDisabled();
  });

  it('is disabled when disabled prop is true', async () => {
    render(UiButton, { children: makeSnippet('Disabled'), disabled: true });
    await expect.element(page.getByRole('button')).toBeDisabled();
  });

  it('fires onclick handler when clicked', async () => {
    const onclick = vi.fn();
    render(UiButton, { children: makeSnippet('Click me'), onclick });
    await page.getByRole('button').click();
    expect(onclick).toHaveBeenCalledOnce();
  });

  it('defaults to type="button"', async () => {
    render(UiButton, { children: makeSnippet('Button') });
    await expect.element(page.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('sets type="submit" when specified', async () => {
    render(UiButton, { children: makeSnippet('Submit'), type: 'submit' });
    await expect.element(page.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('sets aria-pressed attribute', async () => {
    render(UiButton, { children: makeSnippet('Toggle'), 'aria-pressed': true });
    await expect.element(page.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies custom class', async () => {
    render(UiButton, { children: makeSnippet('Custom'), class: 'my-custom-class' });
    await expect.element(page.getByRole('button')).toHaveClass('my-custom-class');
  });

  it('applies primary red classes by default', async () => {
    render(UiButton, { children: makeSnippet('Primary') });
    const button = page.getByRole('button');
    await expect.element(button).toHaveClass('bg-red-700');
    await expect.element(button).toHaveClass('border-red-700');
  });

  it('applies secondary variant classes', async () => {
    render(UiButton, { children: makeSnippet('Secondary'), variant: 'secondary' });
    await expect.element(page.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('applies tertiary variant classes', async () => {
    render(UiButton, { children: makeSnippet('Tertiary'), variant: 'tertiary' });
    const button = page.getByRole('button');
    await expect.element(button).toHaveClass('border-transparent');
    await expect.element(button).toHaveClass('bg-transparent');
  });

  it('applies sm size classes', async () => {
    render(UiButton, { children: makeSnippet('Small'), size: 'sm' });
    const button = page.getByRole('button');
    await expect.element(button).toHaveClass('px-3');
    await expect.element(button).toHaveClass('text-sm');
  });

  it('applies large size classes', async () => {
    render(UiButton, { children: makeSnippet('Large'), size: 'large' });
    const button = page.getByRole('button');
    await expect.element(button).toHaveClass('px-6');
    await expect.element(button).toHaveClass('text-lg');
  });

  it('applies block behavior class', async () => {
    render(UiButton, { children: makeSnippet('Block'), behavior: 'block' });
    await expect.element(page.getByRole('button')).toHaveClass('block');
  });

  it('applies fit behavior class', async () => {
    render(UiButton, { children: makeSnippet('Fit'), behavior: 'fit' });
    await expect.element(page.getByRole('button')).toHaveClass('inline-flex');
  });

  it('applies deep-blue color classes', async () => {
    render(UiButton, { children: makeSnippet('Blue'), color: 'deep-blue' });
    await expect.element(page.getByRole('button')).toHaveClass('bg-deep-blue-700');
  });
});
