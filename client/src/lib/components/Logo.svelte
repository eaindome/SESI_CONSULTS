<script lang="ts">
	import LogoSymbol from '$lib/assets/logo-symbol-transparent.svg';
	import LogoFull from '$lib/assets/logo-tranparent.svg';

	export let variant: 'symbol' | 'full' = 'symbol';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let showText = true;

	const sizeClasses = {
		sm: 'h-8',
		md: 'h-12',
		lg: 'h-16'
	};
</script>

<div class="flex items-center space-x-2">
	{#if variant === 'symbol'}
		<img 
			src={LogoSymbol} 
			alt="SESI Healthcare Logo" 
			class={`w-auto ${sizeClasses[size]}`}
		/>
		{#if showText}
			<span class="font-bold text-xl text-gray-900 dark:text-white transition-colors">
				SESI Healthcare
			</span>
		{/if}
	{:else}
		<img 
			src={LogoFull} 
			alt="SESI Healthcare Full Logo" 
			class={`w-auto ${sizeClasses[size]}`}
		/>
	{/if}
</div>
