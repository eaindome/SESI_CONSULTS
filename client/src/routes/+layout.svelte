<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- Skip to content link for keyboard accessibility -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-emerald-600 focus:px-6 focus:py-3 focus:text-white focus:font-semibold focus:shadow-lg focus:ring-4 focus:ring-emerald-500/50 focus:outline-none"
>
	Skip to main content
</a>

<div class="flex min-h-screen flex-col">
	<Header />
	<main id="main-content" class="flex-1" tabindex="-1">
		{@render children()}
	</main>
	<Footer />
</div>
