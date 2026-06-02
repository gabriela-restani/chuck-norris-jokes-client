<script lang="ts">
  import { untrack } from 'svelte';
  import HomeHeroSection from '$lib/components/home/home-hero-section.svelte';
  import HomeCategoriesSection from '$lib/components/home/home-categories-section.svelte';
  import HomeSearchResultsSection from '$lib/components/home/home-search-results-section.svelte';
  import { ChuckNorrisApi } from '$lib/services/chuck-norris-api';
  import type { Joke } from '$lib/types/chuck-norris';
  import type { PageData } from './$types';
  import { shareLink } from '$lib/utils/share';

  let { data }: { data: PageData } = $props();

  const api = new ChuckNorrisApi();

  let currentJoke = $state(untrack(() => data.joke));
  let isLoadingJoke = $state(false);

  // Search state
  let searchQuery = $state('');
  let searchResults = $state<Joke[]>([]);
  let totalResults = $state(0);
  let isLoadingSearch = $state(false);

  const handleSearch = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    searchQuery = trimmed;
    searchResults = [];
    totalResults = 0;
    isLoadingSearch = true;

    try {
      const result = await api.getJokeByQuery(trimmed);
      searchResults = result.result;
      totalResults = result.total;
    } finally {
      isLoadingSearch = false;
    }
  };

  const handleNewJoke = async () => {
    isLoadingJoke = true;
    try {
      currentJoke = await api.getRandomJoke();
    } finally {
      isLoadingJoke = false;
    }
  };

  const handleShareJoke = () => shareLink(currentJoke.url);
</script>

<HomeHeroSection
  joke={currentJoke}
  {isLoadingJoke}
  onNewJoke={handleNewJoke}
  onShareJoke={handleShareJoke}
  onSearch={handleSearch}
/>

<HomeCategoriesSection categories={data.categories} />

{#if searchQuery}
  <HomeSearchResultsSection
    query={searchQuery}
    jokes={searchResults}
    {totalResults}
    isLoading={isLoadingSearch}
  />
{/if}
