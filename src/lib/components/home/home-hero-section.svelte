<script lang="ts">
  import UiContainer from '$lib/components/ui/ui-container.svelte';
  import UiTitle from '$lib/components/ui/ui-title.svelte';
  import UiStarDivider from '$lib/components/ui/ui-star-divider.svelte';
  import SearchForm from '$lib/components/home/search-form.svelte';
  import CurrentJokeCard from '$lib/components/home/current-joke-card.svelte';
  import type { Joke } from '$lib/types/chuck-norris';

  type HomeHeroSectionProps = {
    joke: Joke;
    isLoadingJoke?: boolean;
    onSearch: (query: string) => void;
    onNewJoke: () => void;
    onShareJoke: () => void;
    class?: string;
    id?: string;
  };

  let {
    joke,
    isLoadingJoke = false,
    onSearch,
    onNewJoke,
    onShareJoke,
    class: className = '',
    id,
  }: HomeHeroSectionProps = $props();
</script>

<UiContainer
  tag="section"
  class={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${className}`}
  {id}
>
  <div class="flex flex-col items-start justify-start gap-4">
    <UiTitle
      tag="h1"
      size={{ base: '2xl', md: '3xl' }}
      weight="bold"
      class="flex flex-col items-start justify-start text-deep-blue-800"
    >
      Chuck Norris
      <span class="text-red-700">Jokes</span>
    </UiTitle>

    <UiStarDivider
      leftLength="0"
      rightLength="70px"
      dividerColor="bg-deep-blue-800"
      starColor="text-red-600"
    />

    <UiTitle size="sm" class="text-deep-blue-800">
      100% american, 100% hilarious, 0% boring.
    </UiTitle>

    <SearchForm {onSearch} />
  </div>

  <div>
    <CurrentJokeCard {joke} isLoading={isLoadingJoke} {onNewJoke} {onShareJoke} />
  </div>
</UiContainer>
