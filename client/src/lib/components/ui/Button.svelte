<script lang="ts">
	import type { ButtonVariant, ButtonSize } from '$lib/types/components';
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: ButtonVariant;
		size?: ButtonSize;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		loading?: boolean;
		class?: string;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
		icon?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		type = 'button',
		disabled = false,
		loading = false,
		class: className = '',
		onclick,
		children,
		icon
	}: Props = $props();

	const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60';

	const variantStyles = {
		primary: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 focus:ring-emerald-500/50 disabled:shadow-none disabled:transform-none',
		secondary: 'bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500/30',
		ghost: 'bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white/20 focus:ring-white/30',
		destructive: 'bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700 hover:shadow-xl focus:ring-red-500/50',
		outline: 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-300/30'
	};

	const sizeStyles = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-2.5 text-base',
		lg: 'px-10 py-4 text-lg'
	};

	const combinedClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
</script>

<button
	{type}
	class={combinedClass}
	disabled={disabled || loading}
	onclick={onclick}
>
	{#if loading}
		<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	{/if}

	{@render children()}

	{#if icon && !loading}
		{@render icon()}
	{/if}
</button>
