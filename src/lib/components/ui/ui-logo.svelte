<script lang="ts">
  import UiTitle from './ui-title.svelte';
</script>

<div class="flex items-center gap-1">
  <svg class="h-8 w-8 lg:h-9 lg:w-9" width="38" height="38" viewBox="0 0 60 60" aria-hidden="true">
    <circle cx="30" cy="30" r="26" fill="#14213D" stroke="#C1121F" stroke-width="3" />
    <circle
      cx="30"
      cy="30"
      r="19"
      fill="none"
      stroke="#F8F4E3"
      stroke-width="2"
      opacity="0.5"
      data-om-id="jsx:/Inline Babel script:5011:99:7"
    />
    <polygon
      points="30.00,15.00 32.70,24.90 44.27,25.36 35.99,31.95 38.82,42.14 30.00,36.30 21.18,42.14 24.01,31.95 15.73,25.36 26.30,24.90"
      fill="#F8F4E3"
    />
  </svg>

  <UiTitle tag="span" size={{ base: 'sm', md: 'md' }} class="leading-0 text-amber-50">
    Chuck Norris
    <UiTitle tag="span" size={{ base: 'sm', md: 'md' }} class="text-red-700">Jokes</UiTitle>
  </UiTitle>
</div>
