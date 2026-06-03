type ToastType = 'success' | 'error' | 'info' | 'warning';

export type Toast = {
  id: number;
  title?: string;
  message: string;
  type: ToastType;
  duration?: number;
};

export type ShowToastOptions = {
  type?: ToastType;
  duration?: number;
};

const toasts = $state<Toast[]>([]);
let nextId = 0;

export function showToast(params: {
  message: string;
  title?: string;
  type?: ToastType;
  duration?: number;
}): number {
  const id = nextId++;
  toasts.push({
    id,
    message: params.message,
    title: params.title,

    type: params.type ?? 'info',
    duration: params.duration,
  });

  if (params.duration !== undefined) {
    setTimeout(() => dismissToast(id), params.duration);
  }

  return id;
}

export function dismissToast(id: number): void {
  const index = toasts.findIndex((t) => t.id === id);
  if (index !== -1) toasts.splice(index, 1);
}

export { toasts };
