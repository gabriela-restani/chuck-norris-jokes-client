<script lang="ts">
  import UiContainer from '$lib/components/ui/ui-container.svelte';
  import UiTitle from '$lib/components/ui/ui-title.svelte';
  import UiStarDivider from '$lib/components/ui/ui-star-divider.svelte';
  import SearchForm from '$lib/components/home/search-form.svelte';
  import CurrentJokeCard from '$lib/components/home/current-joke-card.svelte';

  type HomeHeroSectionProps = {
    onSearch: (query: string) => void;
  };

  let { onSearch }: HomeHeroSectionProps = $props();
</script>

<UiContainer tag="section" class="grid grid-cols-1 items-center gap-8 md:grid-cols-2" id="home">
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
    <CurrentJokeCard />
  </div>
</UiContainer>
