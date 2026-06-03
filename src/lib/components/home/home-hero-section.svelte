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

  let isMobile = $state(false);

  $effect(() => {
    if (typeof window !== 'undefined') {
      isMobile = window.innerWidth < 1024;
    }
  });
</script>

<UiContainer
  tag="section"
  class={`grid grid-cols-1 items-start gap-8 lg:grid-cols-2 ${className}`}
  {id}
>
  <div class="flex flex-col items-center justify-center gap-4 lg:items-start lg:justify-start">
    <UiTitle
      tag="h1"
      size={{ base: '2xl', md: '3xl' }}
      weight="bold"
      class="flex flex-col items-center justify-center text-deep-blue-800 lg:items-start lg:justify-start"
    >
      Chuck Norris
      <span class="text-red-700">Jokes</span>
    </UiTitle>

    <UiStarDivider
      leftLength={isMobile ? '70px' : '0'}
      rightLength="70px"
      dividerColor="bg-deep-blue-800"
      starColor="text-red-600"
      width="fit"
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
