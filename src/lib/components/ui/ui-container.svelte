<script lang="ts">
  import type { Snippet } from 'svelte';

  type UiContainerProps = {
    tag?: 'div' | 'section' | 'main';
    children: Snippet;
    class?: string;
    id?: string;
    'aria-labelledby'?: string;
  };

  let {
    tag = 'div',
    children,
    class: className,
    id,
    'aria-labelledby': ariaLabelledby,
  }: UiContainerProps = $props();
</script>

<svelte:element
  this={tag}
  {id}
  aria-labelledby={ariaLabelledby}
  class={`max-h mx-auto my-0 w-full max-w-[calc(100dvw-2rem)]
    md:max-w-2xl lg:max-w-4xl xl:max-w-5xl ${className || ''}
  `}
>
  {@render children()}
</svelte:element>
