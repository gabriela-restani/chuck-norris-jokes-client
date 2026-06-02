<script lang="ts">
  import UiContainer from '$lib/components/ui/ui-container.svelte';
  import UiTitle from '$lib/components/ui/ui-title.svelte';
  import UiText from '$lib/components/ui/ui-text.svelte';
  import UiStarDivider from '$lib/components/ui/ui-star-divider.svelte';
  import UiButton from '$lib/components/ui/ui-button.svelte';

  let searchQuery = $state('');

  const searchAndGoToResults = () => {
    console.log('Search button clicked! Implement search functionality here.', searchQuery);
  };
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

    <form class="relative w-full" onsubmit={searchAndGoToResults}>
      <input
        type="search"
        placeholder="Search for a joke... Ex: Karate, Chuck, Texas, etc."
        class="
          focus:ring-opacity-50 w-full rounded-md
          border-2 border-gray-300 bg-white py-2 pr-20 pl-4
          text-sm focus:border-red-700 focus:ring-2 focus:ring-red-700
          focus:outline-none
        "
        bind:value={searchQuery}
      />
      <button
        class="
          focus:ring-opacity-50 absolute top-1/2 right-0 h-9.5 -translate-y-1/2
          rounded-r-md border-2 border-red-700 bg-red-700 px-3 pt-0 pb-1 font-oswald
          text-lg text-white transition-colors duration-300 hover:border-red-800
          hover:bg-red-800 focus:ring-2 focus:ring-red-700 focus:outline-none
        "
        type="submit"
      >
        Search
      </button>
    </form>
  </div>

  <div>
    <div
      class="flex w-full flex-col items-start justify-start gap-3 rounded-lg bg-deep-blue-900 p-6 md:aspect-2/1"
    >
      <UiTitle tag="h2" size="xs" weight="medium" class="text-md font-light text-leather-brown-400">
        ★ Current Joke
      </UiTitle>

      <UiText tag="p" size="3xl" weight="medium" class="h-auto text-cream-100">
        Why did Chuck Norris cross the road? To get to the other side... of the world!
      </UiText>

      <UiStarDivider
        leftLength="100%"
        rightLength="100%"
        dividerColor="bg-leather-brown-300"
        starColor="text-red-500"
      />

      <div class="flex w-full gap-4">
        <UiButton
          color="cream"
          variant="secondary"
          behavior="inline-block"
          onclick={() =>
            console.log('See joke button clicked! Implement see joke functionality here.')}
        >
          See Joke
        </UiButton>
        <UiButton
          color="cream"
          variant="secondary"
          behavior="inline-block"
          onclick={() =>
            console.log('Share joke button clicked! Implement share joke functionality here.')}
        >
          Share Joke
        </UiButton>
        <UiButton
          color="red"
          variant="primary"
          behavior="inline-block"
          onclick={() =>
            console.log('New joke button clicked! Implement new joke functionality here.')}
        >
          New Joke
        </UiButton>
      </div>
    </div>
  </div>
</UiContainer>
