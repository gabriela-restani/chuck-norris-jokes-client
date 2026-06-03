import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { createRawSnippet } from 'svelte';
import UiContainer from '$lib/components/ui/ui-container.svelte';

function makeSnippet(text: string) {
  return createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));
}

describe('UiContainer', () => {
  it('renders children content', async () => {
    render(UiContainer, { children: makeSnippet('Inner content') });
    await expect.element(page.getByText('Inner content')).toBeInTheDocument();
  });

  it('renders as div by default', async () => {
    const { container } = render(UiContainer, { children: makeSnippet('Content') });
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('div');
  });

  it('renders as section when tag="section"', async () => {
    const { container } = render(UiContainer, {
      tag: 'section',
      children: makeSnippet('Section'),
    });

    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('section');
  });

  it('renders as main when tag="main"', async () => {
    render(UiContainer, {
      tag: 'main',
      children: makeSnippet('Main content'),
    });

    await expect.element(page.getByRole('main')).toBeInTheDocument();
  });

  it('applies the id attribute', async () => {
    const { container } = render(UiContainer, {
      id: 'my-container',
      children: makeSnippet('Content'),
    });

    expect(container.querySelector('#my-container')).not.toBeNull();
  });

  it('applies aria-labelledby attribute', async () => {
    const { container } = render(UiContainer, {
      'aria-labelledby': 'title-id',
      children: makeSnippet('Content'),
    });

    expect(container.querySelector('[aria-labelledby="title-id"]')).not.toBeNull();
  });

  it('applies custom class', async () => {
    const { container } = render(UiContainer, {
      class: 'extra-class',
      children: makeSnippet('Content'),
    });

    expect(container.querySelector('.extra-class')).not.toBeNull();
  });

  it('includes responsive width class', async () => {
    const { container } = render(UiContainer, { children: makeSnippet('Content') });
    expect(container.querySelector('.w-full')).not.toBeNull();
  });
});
