<script lang="ts">
  type UiStarDividerProps = {
    leftLength?: string;
    rightLength?: string;
    dividerColor?: string;
    starColor?: string;
    width?: 'auto' | 'full' | 'fit';
  };

  let {
    leftLength = '0',
    rightLength = '50px',
    dividerColor = 'bg-deep-blue-400',
    starColor = 'text-red-600',
    width = 'full',
  }: UiStarDividerProps = $props();

  const isZeroRegex = /^0[a-z%]*$/i;

  const hasLeftDivider = $derived(!isZeroRegex.test(leftLength));
  const hasRightDivider = $derived(!isZeroRegex.test(rightLength));
</script>

<div data-testid="ui-star-divider" class={`flex w-${width} items-center gap-2`} aria-hidden="true">
  {#if hasLeftDivider}
    <div
      data-testid="left-divider"
      class={`mt-px h-1 ${dividerColor}`}
      style="width: {leftLength}"
    ></div>
  {/if}

  <span data-testid="star-divider" class={`${starColor} whitespace-nowrap`}>★ ★ ★</span>

  {#if hasRightDivider}
    <div
      data-testid="right-divider"
      class={`mt-px h-1 ${dividerColor}`}
      style="width: {rightLength}"
    ></div>
  {/if}
</div>
