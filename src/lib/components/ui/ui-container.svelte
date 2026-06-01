<script lang="ts">
  import type { Snippet } from 'svelte';

  type UiContainerProps = {
    tag?: 'div' | 'section' | 'main';
    children: Snippet;
  };

  let { tag = 'div', children }: UiContainerProps = $props();
</script>

<svelte:element this={tag} class="mx-auto my-0 w-full max-w-7xl py-6 lg:py-12">
  {@render children()}
</svelte:element>
