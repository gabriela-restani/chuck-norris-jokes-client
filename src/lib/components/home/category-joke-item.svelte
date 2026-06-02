<script lang="ts">
  import type { Joke } from '$lib/types/chuck-norris';
  import UiButton from '../ui/ui-button.svelte';
  import { shareLink } from '$lib/utils/share';

  type CategoryJokeItemProps = { joke: Joke };
  let { joke }: CategoryJokeItemProps = $props();
</script>

<li class="rounded-lg border border-deep-blue-300 bg-deep-blue-800 p-5">
  <p class="text-base leading-relaxed text-cream-100">{joke.value}</p>
  <hr class="my-3 border-deep-blue-600" />
  <div>
    <p class="text-sm text-deep-blue-300">#{joke.categories[0] ?? 'general'}</p>
    <UiButton
      color="deep-blue"
      variant="ghost"
      behavior="inline"
      target="_blank"
      onclick={() => shareLink(joke.url)}
    >
      Share joke
    </UiButton>
  </div>
</li>
