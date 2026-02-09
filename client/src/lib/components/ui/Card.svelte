<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		padding?: 'none' | 'sm' | 'md' | 'lg';
		shadow?: boolean;
		children: Snippet;
	}

	let {
		class: className = '',
		padding = 'md',
		shadow = true,
		children
	}: Props = $props();

	const paddingStyles = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8 sm:p-10'
	};

	const shadowClass = shadow ? 'shadow-xl' : '';
</script>

<div class="relative bg-white rounded-2xl border border-gray-100 {shadowClass} {paddingStyles[padding]} {className}">
	{@render children()}
</div>
