<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { toasts } from '$lib/stores/toasts';
	import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from '@lucide/svelte';

	// Type-specific styles
	const toastStyles = {
		success: 'bg-[#1a5f4a] text-white',
		error: 'bg-red-600 text-white',
		warning: 'bg-yellow-500 text-white',
		info: 'bg-[#0288d1] text-white'
	};

	const icons = {
		success: CheckCircle2,
		error: AlertCircle,
		warning: AlertTriangle,
		info: Info
	};
</script>

<div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md pointer-events-none">
	{#each $toasts as toast (toast.id)}
		<div
			class="flex items-start gap-3 p-4 rounded-xl shadow-lg pointer-events-auto {toastStyles[
				toast.type
			]} transition-all duration-300"
			in:fly={{ x: 300, duration: 300 }}
			out:fade={{ duration: 200 }}
			role="alert"
		>
			<div class="shrink-0">
				<svelte:component this={icons[toast.type]} class="h-5 w-5" />
			</div>
			<div class="flex-1 text-sm font-medium">
				{toast.message}
			</div>
			<button
				onclick={() => toasts.dismiss(toast.id)}
				class="shrink-0 hover:opacity-70 transition-opacity"
				aria-label="Dismiss notification"
			>
				<X class="h-5 w-5" />
			</button>
		</div>
	{/each}
</div>
