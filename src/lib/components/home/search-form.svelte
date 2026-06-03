<script lang="ts">
  type SearchFormProps = {
    onSearch: (query: string) => void;
  };

  let { onSearch }: SearchFormProps = $props();

  let searchQuery = $state('');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };
</script>

<form class="relative w-full" onsubmit={handleSubmit}>
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
