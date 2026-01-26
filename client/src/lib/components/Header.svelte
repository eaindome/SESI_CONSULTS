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

<header class="sticky top-0 z-50 w-full border-b border-teal-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
	<nav class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-2">
				<div class="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
					<span class="text-white font-bold text-lg">S</span>
				</div>
				<span class="font-semibold text-lg text-gray-900">SESI Healthcare</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-sm font-medium transition-colors hover:text-teal-600
							{$page.url.pathname === link.href ? 'text-teal-600' : 'text-gray-700'}"
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/booking"
					class="inline-flex items-center justify-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
				>
					Book Now
				</a>
			</div>

			<!-- Mobile menu button -->
			<button
				type="button"
				class="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
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
		<div class="md:hidden border-t border-teal-100">
			<div class="space-y-1 px-4 pb-3 pt-2">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block rounded-lg px-3 py-2 text-base font-medium transition-colors
							{$page.url.pathname === link.href
								? 'bg-teal-50 text-teal-600'
								: 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'}"
						onclick={closeMobileMenu}
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/booking"
					class="block rounded-lg bg-teal-600 px-3 py-2 text-base font-medium text-white hover:bg-teal-700 transition-colors"
					onclick={closeMobileMenu}
				>
					Book Now
				</a>
			</div>
		</div>
	{/if}
</header>
