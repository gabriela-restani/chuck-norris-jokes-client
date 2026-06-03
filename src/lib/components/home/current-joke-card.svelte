<script lang="ts">
  import UiTitle from '$lib/components/ui/ui-title.svelte';
  import UiText from '$lib/components/ui/ui-text.svelte';
  import UiStarDivider from '$lib/components/ui/ui-star-divider.svelte';
  import UiButton from '$lib/components/ui/ui-button.svelte';
  import type { Joke } from '$lib/types/chuck-norris';

  type CurrentJokeCardProps = {
    joke: Joke;
    isLoading?: boolean;
    onNewJoke: () => void;
    onShareJoke: () => void;
  };

  let { joke, isLoading = false, onNewJoke, onShareJoke }: CurrentJokeCardProps = $props();
</script>

<div
  id="jokes"
  class="flex w-full flex-col items-start justify-around gap-3
    rounded-lg bg-deep-blue-900 p-6 md:min-h-72"
>
  <UiTitle tag="h2" size="xs" weight="medium" class="text-md font-light text-leather-brown-400">
    ★ Current Joke
  </UiTitle>

  <UiText
    tag="p"
    size="3xl"
    weight="medium"
    class="h-auto text-cream-100 transition-opacity duration-300 {isLoading
      ? 'opacity-40'
      : 'opacity-100'}"
  >
    {joke.value}
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
      disabled={isLoading}
      onclick={onShareJoke}
    >
      Share Joke
    </UiButton>
    <UiButton
      color="red"
      variant="primary"
      behavior="inline-block"
      disabled={isLoading}
      onclick={onNewJoke}
    >
      {isLoading ? 'Loading...' : 'New Joke'}
    </UiButton>
  </div>
</div>
