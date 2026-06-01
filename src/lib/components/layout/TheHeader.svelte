<script lang="ts">
  import { resolve } from '$app/paths';
  import UiLogo from '$lib/components/ui/ui-logo.svelte';
  import UiTitle from '$lib/components/ui/ui-title.svelte';
</script>

<header
  class="sticky top-0 z-50
    flex items-center justify-between border-b-4
    border-red-700 bg-indigo-950 px-5
    py-2 lg:px-8 lg:py-4"
>
  <a
    class="absolute top-2 left-1 h-1 opacity-0
      transition-all duration-300 focus:z-50 focus:h-auto
      focus:w-auto focus:rounded-sm focus:bg-indigo-800 focus:p-2
      focus:text-white focus:opacity-100
    "
    href={resolve('/#main')}
  >
    Go to main content
  </a>
  <a href={resolve('/')} aria-label="Chuck Norris Jokes - click to go to Home">
    <UiLogo />
  </a>

  <nav class="flex items-center gap-2" aria-label="Main navigation">
    <a
      href={resolve('/#jokes')}
      class="transition-all duration-300 hover:border-b-2 hover:border-red-700"
    >
      <UiTitle tag="span" size={{ base: 'xs', md: 'sm' }} class="text-amber-50">Joke</UiTitle>
    </a>
    <a
      href={resolve('/#categories')}
      class="transition-all duration-300 hover:border-b-2 hover:border-red-700"
    >
      <UiTitle tag="span" size={{ base: 'xs', md: 'sm' }} class="text-amber-50">Categories</UiTitle>
    </a>
  </nav>
</header>
