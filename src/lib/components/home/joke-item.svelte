<script lang="ts">
  import type { Joke } from '$lib/types/chuck-norris';
  import UiButton from '$lib/components/ui/ui-button.svelte';
  import { shareLink } from '$lib/utils/share';
  import UiText from '$lib/components/ui/ui-text.svelte';

  type CategoryJokeItemProps = { joke: Joke; query?: string };
  let { joke, query }: CategoryJokeItemProps = $props();

  const textWithHighlight = (
    text: string,
    highlight?: string,
  ): Array<{ text: string; isHighlight: boolean }> => {
    if (!highlight) return [{ text, isHighlight: false }];

    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.split(regex).map((part) => ({
      text: part,
      isHighlight: part.toLowerCase() === highlight.toLowerCase(),
    }));
  };
</script>

<li class="rounded-lg border border-deep-blue-300 bg-deep-blue-800 p-5">
  <UiText tag="p" size="lg" class="text-base leading-relaxed text-cream-100">
    {#each textWithHighlight(joke.value, query) as part, i (i)}
      {#if part.isHighlight}
        <mark
          class="bg-transparent text-cream-100 underline decoration-leather-brown-600 decoration-2 underline-offset-2"
          >{part.text}</mark
        >
      {:else}
        {part.text}
      {/if}
    {/each}
  </UiText>

  <hr class="my-3 border-deep-blue-600" />

  <div class="flex items-center justify-between">
    <UiText tag="span" class="text-deep-blue-300">
      #{joke.categories[0] ?? 'general'}
    </UiText>

    <UiButton
      color="cream"
      size="sm"
      variant="secondary"
      behavior="inline"
      onclick={() => shareLink(joke.url)}
    >
      Share joke
    </UiButton>
  </div>
</li>
