<script lang="ts">
  import type { Joke } from '$lib/types/chuck-norris';

  type CategoryJokeItemProps = { joke: Joke };
  let { joke }: CategoryJokeItemProps = $props();
</script>

<li class="rounded-lg border border-deep-blue-300 bg-deep-blue-800 p-5">
  <p class="text-base leading-relaxed text-cream-100">{joke.value}</p>
</li>
