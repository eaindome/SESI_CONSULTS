<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ComponentType } from 'svelte';
	import { CheckCircle, AlertCircle } from '@lucide/svelte';

	interface Props {
		label: string;
		id: string;
		error?: string;
		hint?: string;
		required?: boolean;
		valid?: boolean;
		showValidIcon?: boolean;
		icon?: ComponentType;
		class?: string;
		children: Snippet;
	}

	let {
		label,
		id,
		error = '',
		hint = '',
		required = false,
		valid = false,
		showValidIcon = false,
		icon,
		class: className = '',
		children
	}: Props = $props();

	const hasError = $derived(!!error);
	const showSuccess = $derived(valid && showValidIcon && !hasError);
</script>

<div class="group {className}">
	<label for={id} class="mb-2 flex items-center text-sm font-semibold text-gray-900">
		{#if icon}
			<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
				<svelte:component this={icon} class="h-4 w-4 text-emerald-600" />
			</div>
		{/if}
		{label}
		{#if required}
			<span class="text-red-500 ml-1" aria-label="required">*</span>
		{/if}
		{#if showSuccess}
			<CheckCircle class="h-4 w-4 text-emerald-600 ml-2" aria-label="valid" />
		{/if}
	</label>

	<div class="relative">
		{@render children()}

		{#if showSuccess}
			<div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
				<CheckCircle class="h-5 w-5 text-emerald-600" />
			</div>
		{/if}
	</div>

	{#if hint && !hasError}
		<p class="mt-1.5 text-xs text-gray-500">{hint}</p>
	{/if}

	{#if hasError}
		<p id="{id}-error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
			<AlertCircle class="h-4 w-4" aria-hidden="true" />
			{error}
		</p>
	{/if}
</div>
