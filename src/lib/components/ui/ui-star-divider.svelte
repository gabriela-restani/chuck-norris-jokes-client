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

  $effect(() => {
    if (!hasLeftDivider) {
      console.warn(
        'UiStarDivider: leftLength is set to zero or invalid values. Left divider will be rendered.',
        leftLength,
        hasLeftDivider,
      );
    }
    if (!hasRightDivider) {
      console.warn(
        'UiStarDivider: rightLength is set to zero or invalid values. Right divider will be rendered.',
        rightLength,
        hasRightDivider,
      );
    }
  });
</script>

<div class={`flex w-${width} items-center gap-2`} aria-hidden="true">
  {#if hasLeftDivider}
    <div class={`mt-px h-1 ${dividerColor}`} style="width: {leftLength}"></div>
  {/if}

  <span class={`${starColor} whitespace-nowrap`}>★ ★ ★</span>

  {#if hasRightDivider}
    <div class={`mt-px h-1 ${dividerColor}`} style="width: {rightLength}"></div>
  {/if}
</div>
