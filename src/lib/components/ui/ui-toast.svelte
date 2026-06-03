<script lang="ts">
  import { fly } from 'svelte/transition';
  import { toasts, dismissToast } from '$lib/stores/toast.svelte';

  const toastStyles = {
    success: 'bg-green-600 border-green-700',
    error: 'bg-red-700 border-red-800',
    info: 'bg-deep-blue-700 border-deep-blue-800',
    warning: 'bg-cream-600 border-cream-700',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  const getRole = (type: string) => {
    switch (type) {
      case 'error':
        return 'alert';
      case 'success':
        return 'status';
      default:
        return 'status';
    }
  };

  const getAriaLive = (type: string) => {
    switch (type) {
      case 'error':
        return 'assertive';
      default:
        return 'polite';
    }
  };
</script>

<div
  data-testid="toasts-container"
  class="pointer-events-none fixed top-4 right-4 z-50 flex w-full max-w-xs flex-col gap-2"
>
  {#each toasts as toast (toast.id)}
    <div
      data-testid="ui-toast"
      transition:fly={{ x: 100, duration: 300 }}
      class="pointer-events-auto flex items-start justify-between rounded-md border-2 p-3 text-white shadow-lg
        {toastStyles[toast.type]}"
      role={getRole(toast.type)}
      aria-live={getAriaLive(toast.type)}
    >
      <span data-testid="toast-icon" class="mt-0.5 shrink-0 text-sm font-bold"
        >{icons[toast.type]}</span
      >
      <div>
        {#if toast.title}
          <strong data-testid="toast-title" class="block font-semibold">{toast.title}</strong>
        {/if}

        <p data-testid="toast-message" class="flex-1 font-oswald text-sm leading-snug">
          {toast.message}
        </p>
      </div>
      <button
        data-testid="dismiss-toast"
        class="ml-1 shrink-0 cursor-pointer text-white/70 transition-colors hover:text-white"
        onclick={() => dismissToast(toast.id)}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  {/each}
</div>
