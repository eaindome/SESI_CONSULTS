<script lang="ts">
	import { page } from '$app/stores';
	import { Menu, X } from '@lucide/svelte';

	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/services', label: 'Services' },
		{ href: '/team', label: 'Meet the Team' },
		{ href: '/contact', label: 'Contact' }
	];

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
	<nav class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="flex h-20 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-3">
				<div class="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center">
					<span class="text-white font-bold text-xl">S</span>
				</div>
				<span class="font-bold text-xl text-gray-900">SESI Healthcare</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-base font-medium transition-colors hover:text-emerald-600
							{$page.url.pathname === link.href ? 'text-emerald-600' : 'text-gray-700'}"
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/booking"
					class="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-2.5 text-base font-semibold text-white hover:bg-emerald-700 transition-colors"
				>
					Book Now
				</a>
			</div>

			<!-- Mobile menu button -->
			<button
				type="button"
				class="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-gray-700 hover:bg-gray-100 transition-colors"
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
				aria-expanded={mobileMenuOpen}
			>
				<span class="sr-only">Open main menu</span>
				{#if mobileMenuOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
			</button>
		</div>
	</nav>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden border-t border-gray-200">
			<div class="space-y-1 px-6 pb-4 pt-3">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block rounded-xl px-4 py-3 text-base font-medium transition-colors
							{$page.url.pathname === link.href
								? 'bg-emerald-50 text-emerald-600'
								: 'text-gray-700 hover:bg-gray-100'}"
						onclick={closeMobileMenu}
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/booking"
					class="block rounded-xl bg-emerald-600 px-4 py-3 text-base font-semibold text-white hover:bg-emerald-700 transition-colors mt-2"
					onclick={closeMobileMenu}
				>
					Book Now
				</a>
			</div>
		</div>
	{/if}
</header>
