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

<header class="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
	<nav class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-20 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-3 group">
				<div class="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
					<span class="text-white font-bold text-xl">S</span>
				</div>
				<span class="font-bold text-xl text-gray-900">SESI Healthcare</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-base font-medium transition-all duration-300 hover:text-emerald-600 relative group
							{$page.url.pathname === link.href ? 'text-emerald-600' : 'text-gray-700'}"
					>
						{link.label}
						{#if $page.url.pathname === link.href}
							<span class="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500"></span>
						{/if}
					</a>
				{/each}
				<a
					href="/booking"
					class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-2.5 text-base font-semibold text-white hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
				>
					Book Now
				</a>
			</div>

			<!-- Mobile menu button -->
			<button
				type="button"
				class="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300"
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
		<div class="md:hidden border-t border-emerald-100 animate-fade-in">
			<div class="space-y-2 px-4 pb-4 pt-3">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block rounded-xl px-4 py-3 text-base font-medium transition-all duration-300
							{$page.url.pathname === link.href
								? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600'
								: 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'}"
						onclick={closeMobileMenu}
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/booking"
					class="block rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3 text-base font-semibold text-white hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-md mt-2"
					onclick={closeMobileMenu}
				>
					Book Now
				</a>
			</div>
		</div>
	{/if}
</header>
