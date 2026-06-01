<script lang="ts">
  import type { Snippet } from 'svelte';

  type UiContainerProps = {
    tag?: 'div' | 'section' | 'main';
    children: Snippet;
    class?: string;
    id?: string;
  };

  let { tag = 'div', children, class: className, id }: UiContainerProps = $props();
</script>

<svelte:element
  this={tag}
  {id}
  class={`mx-auto my-0 w-full max-w-7xl py-6 lg:py-12 ${className || ''}`}
>
  {@render children()}
</svelte:element>
