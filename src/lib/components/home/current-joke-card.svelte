<script lang="ts">
  import UiTitle from '$lib/components/ui/ui-title.svelte';
  import UiText from '$lib/components/ui/ui-text.svelte';
  import UiStarDivider from '$lib/components/ui/ui-star-divider.svelte';
  import UiButton from '$lib/components/ui/ui-button.svelte';
</script>

<div
  id="jokes"
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
      onclick={() => console.log('Share joke button clicked! Implement share joke functionality here.')}
    >
      Share Joke
    </UiButton>
    <UiButton
      color="red"
      variant="primary"
      behavior="inline-block"
      onclick={() => console.log('New joke button clicked! Implement new joke functionality here.')}
    >
      New Joke
    </UiButton>
  </div>
</div>
