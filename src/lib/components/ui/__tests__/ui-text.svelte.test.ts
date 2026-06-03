import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { createRawSnippet } from 'svelte';
import UiText from '$lib/components/ui/ui-text.svelte';

function makeSnippet(text: string) {
  return createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));
}

describe('UiText', () => {
  it('renders children content', async () => {
    render(UiText, { children: makeSnippet('Hello') });
    await expect.element(page.getByText('Hello')).toBeInTheDocument();
  });

  describe('tag', () => {
    it('renders as span by default', async () => {
      const { container } = render(UiText, { children: makeSnippet('Text') });
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('span');
    });

    it('renders as paragraph when tag="p"', async () => {
      const { container } = render(UiText, { tag: 'p', children: makeSnippet('Paragraph') });
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('p');
    });

    it('renders as label when tag="label"', async () => {
      const { container } = render(UiText, { tag: 'label', children: makeSnippet('Label') });
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('label');
    });
  });

  describe('size', () => {
    it('applies base size class by default', async () => {
      const { container } = render(UiText, { children: makeSnippet('Text') });
      expect(container.firstElementChild?.className).toContain('text-base');
    });

    it('applies xs size class', async () => {
      const { container } = render(UiText, { size: 'xs', children: makeSnippet('Text') });
      expect(container.firstElementChild?.className).toContain('text-xs');
    });

    it('applies lg size class', async () => {
      const { container } = render(UiText, { size: 'lg', children: makeSnippet('Text') });
      expect(container.firstElementChild?.className).toContain('text-lg');
    });

    it('applies responsive size classes via object', async () => {
      const { container } = render(UiText, {
        size: { base: 'sm', md: 'lg' },
        children: makeSnippet('Text'),
      });

      const className = container.firstElementChild?.className ?? '';

      expect(className).toContain('text-sm');
      expect(className).toContain('md:text-lg');
    });
  });

  describe('weight', () => {
    it('applies medium weight class by default', async () => {
      const { container } = render(UiText, { children: makeSnippet('Text') });
      expect(container.firstElementChild?.className).toContain('font-medium');
    });

    it('applies bold weight class', async () => {
      const { container } = render(UiText, { weight: 'bold', children: makeSnippet('Text') });
      expect(container.firstElementChild?.className).toContain('font-bold');
    });

    it('applies semibold weight class', async () => {
      const { container } = render(UiText, { weight: 'semibold', children: makeSnippet('Text') });
      expect(container.firstElementChild?.className).toContain('font-semibold');
    });

    it('applies responsive weight classes via object', async () => {
      const { container } = render(UiText, {
        weight: { base: 'medium', lg: 'bold' },
        children: makeSnippet('Text'),
      });

      const className = container.firstElementChild?.className ?? '';

      expect(className).toContain('font-medium');
      expect(className).toContain('lg:font-bold');
    });
  });

  it('applies custom class', async () => {
    const { container } = render(UiText, { class: 'my-class', children: makeSnippet('Text') });
    expect(container.firstElementChild?.className).toContain('my-class');
  });

  it('includes font-oswald base class', async () => {
    const { container } = render(UiText, { children: makeSnippet('Text') });
    expect(container.firstElementChild?.className).toContain('font-oswald');
  });
});
