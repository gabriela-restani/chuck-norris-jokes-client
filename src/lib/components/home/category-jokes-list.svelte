<script lang="ts">
  import type { Joke } from '$lib/types/chuck-norris';
  import UiTitle from '$lib/components/ui/ui-title.svelte';
  import UiText from '$lib/components/ui/ui-text.svelte';
  import UiButton from '$lib/components/ui/ui-button.svelte';
  import UiStarDivider from '$lib/components/ui/ui-star-divider.svelte';
  import CategoryJokeItem from '$lib/components/home/category-joke-item.svelte';

  type CategoryJokesListProps = {
    heading: string;
    jokes: Joke[];
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
  };

  let { heading, jokes, isLoading, hasMore, onLoadMore }: CategoryJokesListProps = $props();
</script>

<div class="flex flex-col gap-6">
  <UiStarDivider
    leftLength="100%"
    rightLength="100%"
    dividerColor="bg-deep-blue-200"
    starColor="text-leather-brown-600"
  />

  <div class="flex flex-col items-center gap-1">
    <UiTitle
      tag="h3"
      size="xs"
      weight="semibold"
      class="flex items-center gap-2 text-leather-brown-800"
    >
      <span class="text-sm">★</span>
      {heading}
      <span class="text-sm">★</span>
    </UiTitle>
    <UiText tag="p" size="lg" weight="medium" class="text-soft-black-900">
      {jokes.length} joke{jokes.length === 1 ? '' : 's'} loaded
    </UiText>
  </div>

  <ul class="flex flex-col gap-4">
    {#each jokes as joke (joke.id)}
      <CategoryJokeItem {joke} />
    {/each}

    {#if isLoading}
      <li class="rounded-lg border border-deep-blue-200 bg-deep-blue-100 p-5 text-center">
        <UiText tag="p" size="md" class="animate-pulse text-deep-blue-600"
          >Loading jokes...</UiText
        >
      </li>
    {/if}
  </ul>

  {#if hasMore && !isLoading}
    <div class="flex justify-center">
      <UiButton color="deep-blue" variant="secondary" behavior="inline" onclick={onLoadMore}>
        Load more jokes
      </UiButton>
    </div>
  {/if}
</div>
