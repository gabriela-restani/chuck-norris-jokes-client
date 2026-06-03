import { showToast } from '$lib/stores/toast.svelte';

export async function shareLink(url: string): Promise<void> {
  if (navigator.share) {
    await navigator.share({ url });
    return;
  }

  try {
    await navigator.clipboard.writeText(url);

    showToast({
      message: 'Link copiado para a área de transferência!',
      type: 'success',
      duration: 3000,
    });
  } catch {
    showToast({
      message: 'Não foi possível copiar o link. Tente novamente.',
      type: 'error',
      duration: 3000,
    });
  }
}
