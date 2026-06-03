import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { createRawSnippet } from 'svelte';
import UiTitle from '$lib/components/ui/ui-title.svelte';

function makeSnippet(text: string) {
  return createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));
}

describe('UiTitle', () => {
  it('renders children content', async () => {
    render(UiTitle, { children: makeSnippet('My Title') });
    await expect.element(page.getByText('My Title')).toBeInTheDocument();
  });

  describe('tag', () => {
    it('renders as h2 by default', async () => {
      const { container } = render(UiTitle, { children: makeSnippet('Title') });
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('h2');
    });

    it('renders as h1 when tag="h1"', async () => {
      render(UiTitle, { tag: 'h1', children: makeSnippet('Main heading') });
      await expect.element(page.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders as h3 when tag="h3"', async () => {
      render(UiTitle, { tag: 'h3', children: makeSnippet('Subheading') });
      await expect.element(page.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('renders as span when tag="span"', async () => {
      const { container } = render(UiTitle, { tag: 'span', children: makeSnippet('Span title') });
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('span');
    });
  });

  describe('size', () => {
    it('applies md size class by default (text-3xl at base)', async () => {
      const { container } = render(UiTitle, { children: makeSnippet('Title') });
      expect(container.firstElementChild?.className).toContain('text-3xl');
    });

    it('applies xs size class (text-xl at base)', async () => {
      const { container } = render(UiTitle, { size: 'xs', children: makeSnippet('Title') });
      expect(container.firstElementChild?.className).toContain('text-xl');
    });

    it('applies xl size class (text-5xl at base)', async () => {
      const { container } = render(UiTitle, { size: 'xl', children: makeSnippet('Title') });
      expect(container.firstElementChild?.className).toContain('text-5xl');
    });

    it('applies responsive size classes via object', async () => {
      const { container } = render(UiTitle, {
        size: { base: 'xs', lg: 'xl' },
        children: makeSnippet('Title'),
      });
      const className = container.firstElementChild?.className ?? '';
      expect(className).toContain('text-xl');
      expect(className).toContain('lg:text-5xl');
    });
  });

  describe('weight', () => {
    it('applies semibold weight by default', async () => {
      const { container } = render(UiTitle, { children: makeSnippet('Title') });
      expect(container.firstElementChild?.className).toContain('font-semibold');
    });

    it('applies bold weight class', async () => {
      const { container } = render(UiTitle, { weight: 'bold', children: makeSnippet('Title') });
      expect(container.firstElementChild?.className).toContain('font-bold');
    });
  });

  it('applies the id attribute', async () => {
    render(UiTitle, { id: 'section-title', children: makeSnippet('Title') });
    await expect
      .element(page.getByRole('heading', { name: 'Title' }))
      .toHaveAttribute('id', 'section-title');
  });

  it('applies custom class', async () => {
    const { container } = render(UiTitle, {
      class: 'custom-title',
      children: makeSnippet('Title'),
    });
    expect(container.firstElementChild?.className).toContain('custom-title');
  });

  it('includes font-bebas base class', async () => {
    const { container } = render(UiTitle, { children: makeSnippet('Title') });
    expect(container.firstElementChild?.className).toContain('font-bebas');
  });
});
