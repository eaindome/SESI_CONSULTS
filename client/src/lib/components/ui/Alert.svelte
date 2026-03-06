<script lang="ts">
	import { fade } from 'svelte/transition';
	import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from '@lucide/svelte';

	// Props
	let {
		type = 'info',
		dismissible = true,
		autoDismiss = false,
		duration = 5000,
		ondismiss
	}: {
		type?: 'success' | 'error' | 'warning' | 'info';
		dismissible?: boolean;
		autoDismiss?: boolean;
		duration?: number;
		ondismiss?: () => void;
	} = $props();

	// Internal state
	let isVisible = $state(true);

	// Type-specific classes and icons
	const typeClasses = {
		success: 'bg-[#1a5f4a]/10 border-[#4caf50] text-[#1a5f4a]',
		error: 'bg-red-50 border-red-300 text-red-800',
		warning: 'bg-yellow-50 border-yellow-300 text-yellow-800',
		info: 'bg-blue-50 border-blue-300 text-blue-800'
	};

	const iconColorClasses = {
		success: 'text-[#1a5f4a]',
		error: 'text-red-600',
		warning: 'text-yellow-600',
		info: 'text-blue-600'
	};

	const icons = {
		success: CheckCircle2,
		error: AlertCircle,
		warning: AlertTriangle,
		info: Info
	};

	// Auto dismiss
	if (autoDismiss && duration > 0) {
		setTimeout(() => {
			dismiss();
		}, duration);
	}

	// Dismiss function
	function dismiss() {
		isVisible = false;
		if (ondismiss) {
			ondismiss();
		}
	}
</script>

{#if isVisible}
	<div
		class="flex items-start gap-3 p-4 rounded-xl border {typeClasses[type]} transition-all duration-300"
		transition:fade={{ duration: 200 }}
		role="alert"
	>
		<div class="shrink-0 {iconColorClasses[type]}">
			<svelte:component this={icons[type]} class="h-5 w-5" />
		</div>
		<div class="flex-1">
			<slot />
		</div>
		{#if dismissible}
			<button
				onclick={dismiss}
				class="shrink-0 {iconColorClasses[type]} hover:opacity-70 transition-opacity"
				aria-label="Dismiss alert"
			>
				<X class="h-5 w-5" />
			</button>
		{/if}
	</div>
{/if}
