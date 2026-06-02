<script lang="ts">
  import { untrack } from 'svelte';
  import HomeHeroSection from '$lib/components/home/home-hero-section.svelte';
  import HomeCategoriesSection from '$lib/components/home/home-categories-section.svelte';
  import { ChuckNorrisApi } from '$lib/services/chuck-norris-api';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const api = new ChuckNorrisApi();

  // Initialized from load data; managed independently by handleNewJoke / handleShareJoke
  let currentJoke = $state(untrack(() => data.joke));
  let isLoadingJoke = $state(false);

  const handleNewJoke = async () => {
    isLoadingJoke = true;
    try {
      currentJoke = await api.getRandomJoke();
    } finally {
      isLoadingJoke = false;
    }
  };

  const handleShareJoke = async () => {
    try {
      await navigator.clipboard.writeText(currentJoke.url);
    } catch {
      prompt('Copy the joke link:', currentJoke.url);
    }
  };

  const handleSearch = (query: string) => {
    console.log('Implement search navigation', query);
  };
</script>

<HomeHeroSection
  joke={currentJoke}
  {isLoadingJoke}
  onNewJoke={handleNewJoke}
  onShareJoke={handleShareJoke}
  onSearch={handleSearch}
/>
<HomeCategoriesSection categories={data.categories} />
