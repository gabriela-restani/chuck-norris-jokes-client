import { describe, it, expect, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { toasts, showToast, dismissToast } from '$lib/stores/toast.svelte';
import UiToast from '$lib/components/ui/ui-toast.svelte';

afterEach(() => {
  [...toasts].forEach((t) => dismissToast(t.id));
});

describe('UiToast', () => {
  it('renders no toast items when state is empty', async () => {
    const { container } = render(UiToast);
    const items = container.querySelectorAll('[role="status"], [role="alert"]');
    expect(items.length).toBe(0);
  });

  describe('message and title', () => {
    it('renders a toast with its message', async () => {
      showToast({ message: 'Hello toast', type: 'info' });
      render(UiToast);

      await expect.element(page.getByTestId('toast-message')).toBeInTheDocument();
      await expect.element(page.getByTestId('toast-message')).toHaveTextContent('Hello toast');
    });

    it('renders a toast with a title', async () => {
      showToast({ message: 'Body text', title: 'My Title', type: 'success' });
      render(UiToast);

      await expect.element(page.getByTestId('toast-title')).toBeInTheDocument();
      await expect.element(page.getByTestId('toast-title')).toHaveTextContent('My Title');
      await expect.element(page.getByTestId('toast-message')).toBeInTheDocument();
      await expect.element(page.getByTestId('toast-message')).toHaveTextContent('Body text');
    });

    it('does not render a title element when title is not provided', async () => {
      showToast({ message: 'No title', type: 'info' });

      const { container } = render(UiToast);

      expect(container.querySelector('strong')).toBeNull();
    });
  });

  describe('type and icon', () => {
    describe('sucess', () => {
      it('has role="status" and aria-live="polite"', async () => {
        showToast({ message: 'Success', type: 'success' });
        render(UiToast);

        const toast = page.getByRole('status');

        await expect.element(toast).toBeInTheDocument();
        await expect.element(toast).toHaveAttribute('aria-live', 'polite');
      });

      it('shows ✓ icon for success toasts', async () => {
        showToast({ message: 'Done', type: 'success' });

        render(UiToast);

        await expect.element(page.getByTestId('toast-icon')).toBeInTheDocument();
        await expect.element(page.getByTestId('toast-icon')).toHaveTextContent('✓');
      });

      it('success toast applies bg-green-600 class', async () => {
        showToast({ message: 'Success', type: 'success' });
        render(UiToast);

        await expect.element(page.getByTestId('ui-toast')).toHaveClass('bg-green-600');
      });
    });

    describe('error', () => {
      it('has role="alert" and aria-live="assertive"', async () => {
        showToast({ message: 'Error', type: 'error' });
        render(UiToast);
        const toast = page.getByRole('alert');
        await expect.element(toast).toBeInTheDocument();

        await expect.element(toast).toHaveAttribute('aria-live', 'assertive');
      });

      it('shows ✕ icon for error toasts', async () => {
        showToast({ message: 'Failed', type: 'error' });

        render(UiToast);

        await expect.element(page.getByTestId('toast-icon')).toBeInTheDocument();
        await expect.element(page.getByTestId('toast-icon')).toHaveTextContent('✕');
      });

      it('error toast applies bg-red-700 class', async () => {
        showToast({ message: 'Error', type: 'error' });
        render(UiToast);

        await expect.element(page.getByTestId('ui-toast')).toHaveClass('bg-red-700');
      });
    });

    describe('info', () => {
      it('has role="status" and aria-live="polite"', async () => {
        showToast({ message: 'Info', type: 'info' });
        render(UiToast);

        const toast = page.getByRole('status');

        await expect.element(toast).toBeInTheDocument();
        await expect.element(toast).toHaveAttribute('aria-live', 'polite');
      });

      it('shows ℹ icon for info toasts', async () => {
        showToast({ message: 'FYI', type: 'info' });

        render(UiToast);

        await expect.element(page.getByTestId('toast-icon')).toBeInTheDocument();
        await expect.element(page.getByTestId('toast-icon')).toHaveTextContent('ℹ');
      });

      it('info toast applies bg-deep-blue-700 class', async () => {
        showToast({ message: 'Info', type: 'info' });
        render(UiToast);

        await expect.element(page.getByTestId('ui-toast')).toHaveClass('bg-deep-blue-700');
      });
    });

    describe('warning', () => {
      it('has role="status" and aria-live="assertive"', async () => {
        showToast({ message: 'Warning', type: 'warning' });
        render(UiToast);
        const toast = page.getByRole('status');
        await expect.element(toast).toBeInTheDocument();

        await expect.element(toast).toHaveAttribute('aria-live', 'polite');
      });

      it('shows ⚠ icon for warning toasts', async () => {
        showToast({ message: 'Careful', type: 'warning' });

        render(UiToast);

        await expect.element(page.getByTestId('toast-icon')).toBeInTheDocument();
        await expect.element(page.getByTestId('toast-icon')).toHaveTextContent('⚠');
      });

      it('warning toast applies bg-cream-600 class', async () => {
        showToast({ message: 'Warning', type: 'warning' });
        render(UiToast);

        await expect.element(page.getByTestId('ui-toast')).toHaveClass('bg-cream-600');
      });
    });
  });

  describe('dismiss button', () => {
    it('renders a dismiss button', async () => {
      showToast({ message: 'Dismissable', type: 'info' });
      render(UiToast);

      await expect
        .element(page.getByRole('button', { name: 'Close notification' }))
        .toBeInTheDocument();
    });

    it('clicking dismiss removes the toast from the DOM', async () => {
      showToast({ message: 'To be dismissed', type: 'info' });
      render(UiToast);

      await expect.element(page.getByTestId('toast-message')).toBeInTheDocument();

      await page.getByRole('button', { name: 'Close notification' }).click();

      await expect.element(page.getByTestId('toast-message')).not.toBeInTheDocument();
    });
  });

  describe('multiple toasts', () => {
    it('renders multiple toasts simultaneously', async () => {
      showToast({ message: 'Toast one', type: 'info' });
      showToast({ message: 'Toast two', type: 'success' });
      render(UiToast);

      const toasts = page.getByTestId('toast-message').elements();

      await expect(toasts.length).toBe(2);
      await expect.element(toasts[0]).not.toBeNullable();
      await expect.element(toasts[1]).not.toBeNullable();
      await expect.element(toasts[0]).toHaveTextContent('Toast one');
      await expect.element(toasts[1]).toHaveTextContent('Toast two');
    });
  });
});
