import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TheFooter from '$lib/components/layout/TheFooter.svelte';

describe('TheFooter', () => {
  it('matches snapshot', () => {
    const { container } = render(TheFooter);

    expect(container.innerHTML).toMatchSnapshot();
  });
});
