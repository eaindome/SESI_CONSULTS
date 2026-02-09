<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		name?: string;
		value?: string;
		disabled?: boolean;
		required?: boolean;
		error?: boolean;
		placeholder?: string;
		class?: string;
		onblur?: (e: FocusEvent) => void;
		onchange?: (e: Event) => void;
		children: Snippet;
	}

	let {
		id,
		name,
		value = $bindable(''),
		disabled = false,
		required = false,
		error = false,
		placeholder = 'Select an option...',
		class: className = '',
		onblur,
		onchange,
		children
	}: Props = $props();

	const baseStyles = 'w-full rounded-xl border-2 bg-white px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed appearance-none cursor-pointer';

	const errorStyles = error
		? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
		: 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/10 hover:border-gray-300';

	const combinedClass = `${baseStyles} ${errorStyles} ${className}`;
</script>

<select
	{id}
	{name}
	bind:value
	{disabled}
	{required}
	class={combinedClass}
	aria-required={required}
	aria-invalid={error}
	aria-describedby={error ? `${id}-error` : undefined}
	onblur={onblur}
	onchange={onchange}
>
	{#if placeholder}
		<option value="">{placeholder}</option>
	{/if}
	{@render children()}
</select>
