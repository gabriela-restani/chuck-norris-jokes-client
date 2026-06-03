import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import UiLogo from '$lib/components/ui/ui-logo.svelte';

describe('UiLogo', () => {
  it('matches snapshot', () => {
    const { container } = render(UiLogo);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
