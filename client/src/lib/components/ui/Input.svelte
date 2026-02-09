<script lang="ts">
	import type { InputType } from '$lib/types/components';

	interface Props {
		type?: InputType;
		id: string;
		name?: string;
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		autocomplete?: string;
		min?: string;
		max?: string;
		error?: boolean;
		class?: string;
		oninput?: (e: Event) => void;
		onblur?: (e: FocusEvent) => void;
		onfocus?: (e: FocusEvent) => void;
	}

	let {
		type = 'text',
		id,
		name,
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		required = false,
		readonly = false,
		autocomplete,
		min,
		max,
		error = false,
		class: className = '',
		oninput,
		onblur,
		onfocus
	}: Props = $props();

	const baseStyles = 'w-full rounded-xl border-2 bg-white px-4 py-3.5 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed';

	const errorStyles = error
		? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
		: 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/10 hover:border-gray-300';

	const combinedClass = `${baseStyles} ${errorStyles} ${className}`;
</script>

<input
	{type}
	{id}
	{name}
	bind:value
	{placeholder}
	{disabled}
	{required}
	{readonly}
	{autocomplete}
	{min}
	{max}
	class={combinedClass}
	aria-required={required}
	aria-invalid={error}
	aria-describedby={error ? `${id}-error` : undefined}
	oninput={oninput}
	onblur={onblur}
	onfocus={onfocus}
/>
