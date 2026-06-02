<script lang="ts">
  import type { Joke } from '$lib/types/chuck-norris';
  import UiContainer from '$lib/components/ui/ui-container.svelte';
  import UiTitle from '$lib/components/ui/ui-title.svelte';

  type HomeSearchResultsSectionProps = {
    query: string;
    jokes: Joke[];
    totalResults: number;
    isLoading: boolean;
  };

  let { query, jokes, totalResults, isLoading }: HomeSearchResultsSectionProps = $props();
</script>

<UiContainer tag="section" class="flex flex-col gap-2 py-0" id="search-results">
  <div class="flex flex-col items-center gap-1">
    {#if isLoading}
      <UiTitle tag="h2" size="xs" weight="semibold" class="animate-pulse text-leather-brown-600">
        Searching...
      </UiTitle>
    {:else if totalResults === 0}
      <UiTitle tag="h2" size="xs" weight="semibold" class="text-leather-brown-800">
        No results for "{query}"
      </UiTitle>
    {:else}
      <UiTitle tag="h2" size="xs" weight="semibold" class="text-leather-brown-800">
        {totalResults} result{totalResults === 1 ? '' : 's'} for "{query}"
      </UiTitle>
    {/if}
  </div>

  <ul class="flex flex-col gap-4">
    {#each jokes as joke (joke.id)}
      <li class="rounded-lg border border-deep-blue-300 bg-deep-blue-800 p-5">
        <p class="text-base leading-relaxed text-cream-100">{joke.value}</p>
        <hr class="my-3 border-deep-blue-600" />
        <p class="text-sm text-deep-blue-300">#{joke.categories[0] ?? 'general'}</p>
      </li>
    {/each}
  </ul>
</UiContainer>
