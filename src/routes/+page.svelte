<script lang="ts">
  import HomeHeroSection from '$lib/components/home/home-hero-section.svelte';
  import HomeCategoriesSection from '$lib/components/home/home-categories-section.svelte';
  import HomeSearchResultsSection from '$lib/components/home/home-search-results-section.svelte';
  import UiStarDivider from '$lib/components/ui/ui-star-divider.svelte';
  import { ChuckNorrisApi } from '$lib/services/chuck-norris-api';
  import type { Joke } from '$lib/types/chuck-norris';
  import type { PageData } from './$types';
  import UiContainer from '$lib/components/ui/ui-container.svelte';

  let { data }: { data: PageData } = $props();

  const api = new ChuckNorrisApi();

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
</script>

<HomeHeroSection id="home" class="mt-6" initialJoke={data.joke} onSearch={handleSearch} />

{#if searchQuery}
  <UiContainer tag="div" class="mt-6">
    <UiStarDivider
      leftLength="100%"
      rightLength="100%"
      dividerColor="bg-deep-blue-800"
      starColor="text-red-600"
    />
  </UiContainer>

  <HomeSearchResultsSection
    class="mt-6"
    id="search-results"
    query={searchQuery}
    jokes={searchResults}
    {totalResults}
    isLoading={isLoadingSearch}
  />
{/if}

<HomeCategoriesSection categories={data.categories} />
