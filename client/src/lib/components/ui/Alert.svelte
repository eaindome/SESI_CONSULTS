<script lang="ts">
	import type { AlertVariant } from '$lib/types/components';
	import type { Snippet } from 'svelte';
	import { CheckCircle, AlertCircle, AlertTriangle, Info } from '@lucide/svelte';

	interface Props {
		variant?: AlertVariant;
		title?: string;
		message?: string;
		class?: string;
		children?: Snippet;
	}

	let {
		variant = 'info',
		title,
		message,
		class: className = '',
		children
	}: Props = $props();

	const config = {
		success: {
			container: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-emerald-100/50',
			icon: 'bg-emerald-600',
			iconComponent: CheckCircle,
			titleColor: 'text-emerald-900',
			messageColor: 'text-emerald-700'
		},
		error: {
			container: 'border-red-200 bg-gradient-to-br from-red-50 to-orange-50 shadow-red-100/50',
			icon: 'bg-red-600',
			iconComponent: AlertCircle,
			titleColor: 'text-red-900',
			messageColor: 'text-red-700'
		},
		warning: {
			container: 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-amber-100/50',
			icon: 'bg-amber-600',
			iconComponent: AlertTriangle,
			titleColor: 'text-amber-900',
			messageColor: 'text-amber-700'
		},
		info: {
			container: 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-blue-100/50',
			icon: 'bg-blue-600',
			iconComponent: Info,
			titleColor: 'text-blue-900',
			messageColor: 'text-blue-700'
		}
	};

	const currentConfig = config[variant];
	const IconComponent = currentConfig.iconComponent;
</script>

<div
	class="rounded-xl border p-6 shadow-lg animate-fade-in {currentConfig.container} {className}"
	role="alert"
	aria-live="polite"
>
	<div class="flex items-start gap-3">
		<div class="shrink-0 rounded-full p-1 {currentConfig.icon}">
			<IconComponent class="h-5 w-5 text-white" />
		</div>
		<div class="flex-1 min-w-0">
			{#if title}
				<h3 class="font-semibold {currentConfig.titleColor}">{title}</h3>
			{/if}
			{#if message}
				<p class="mt-2 text-sm {currentConfig.messageColor}">{message}</p>
			{/if}
			{#if children}
				<div class="mt-2 text-sm {currentConfig.messageColor}">
					{@render children()}
				</div>
			{/if}
		</div>
	</div>
</div>
