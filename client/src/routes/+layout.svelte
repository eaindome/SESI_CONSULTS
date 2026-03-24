<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import favicon from '$lib/assets/white.png';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	let { children } = $props();

	// Check if current route is admin
	const isAdminRoute = $derived($page.url.pathname.startsWith('/admin'));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if isAdminRoute}
	<!-- Admin routes use their own layout -->
	{@render children()}
{:else}
	<!-- Public routes use Header/Footer -->
	<div class="flex min-h-screen flex-col bg-[#f5f5f5]">
		<Header />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
{/if}

<ToastContainer />
