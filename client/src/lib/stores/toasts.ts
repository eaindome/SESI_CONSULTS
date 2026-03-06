import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type Toast = {
	id: string;
	message: string;
	type: ToastType;
	duration?: number;
};

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	function dismiss(id: string) {
		update((toasts) => toasts.filter((t) => t.id !== id));
	}

	function add(message: string, type: ToastType, duration = 3000) {
		const id = crypto.randomUUID();
		update((toasts) => [...toasts, { id, message, type, duration }]);

		if (duration > 0) {
			setTimeout(() => dismiss(id), duration);
		}

		return id;
	}

	return {
		subscribe,
		success: (message: string, duration = 3000) => add(message, 'success', duration),
		error: (message: string, duration = 4000) => add(message, 'error', duration),
		warning: (message: string, duration = 3500) => add(message, 'warning', duration),
		info: (message: string, duration = 3000) => add(message, 'info', duration),
		dismiss
	};
}

export const toasts = createToastStore();
