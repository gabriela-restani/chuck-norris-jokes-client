<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import TheHeader from '$lib/components/layout/TheHeader.svelte';
  import TheFooter from '$lib/components/layout/TheFooter.svelte';

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<TheHeader />
<main>
  {@render children()}
</main>
<TheFooter />