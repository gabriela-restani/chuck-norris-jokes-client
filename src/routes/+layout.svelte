<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import TheHeader from '$lib/components/layout/TheHeader.svelte';
  import TheFooter from '$lib/components/layout/TheFooter.svelte';

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<TheHeader />

<main
  id="main"
  class="my-0 flex min-h-[calc(100dvh-96px)] flex-col
    items-center justify-start
    md:min-h-[calc(100dvh-104px)] lg:min-h-[calc(100dvh-136px)]
  "
>
  {@render children()}
</main>

<TheFooter />
