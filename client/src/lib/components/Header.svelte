<script lang="ts">
	import { page } from '$app/stores';
	import { Menu, X, ChevronDown } from '@lucide/svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import Logo from './Logo.svelte';

	let mobileMenuOpen = $state(false);
	let servicesDropdownOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/team', label: 'Meet the Team' },
		{ href: '/consultations', label: 'Consultations' },
		{ href: '/classes', label: 'Training' },
		{ href: '/contact', label: 'Contact' }
	];

	const servicesLinks = [
		{ href: '/services', label: 'All Services' },
		{ href: '/services/wound-care', label: 'Wound Care' },
		{ href: '/services/home-care', label: 'Home Care' },
		{ href: '/medical-supplies', label: 'Medical Supplies' }
	];

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function toggleServicesDropdown() {
		servicesDropdownOpen = !servicesDropdownOpen;
	}

	function closeServicesDropdown() {
		servicesDropdownOpen = false;
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-colors" style="will-change: transform; transform: translateZ(0);">
	<nav class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="flex h-20 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center">
				<Logo variant="symbol" size="md" />
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-6">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-base font-medium transition-colors hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400
							{$page.url.pathname === link.href ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700'}"
					>
						{link.label}
					</a>
				{/each}

				<!-- Services Dropdown -->
				<div class="relative">
					<button
						type="button"
						onclick={toggleServicesDropdown}
						onblur={() => setTimeout(closeServicesDropdown, 200)}
						class="flex items-center gap-1 text-base font-medium transition-colors hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400
							{$page.url.pathname.startsWith('/services') || $page.url.pathname.startsWith('/medical-supplies') ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700'}"
					>
						Services
						<ChevronDown class="h-4 w-4 transition-transform {servicesDropdownOpen ? 'rotate-180' : ''}" />
					</button>

					{#if servicesDropdownOpen}
						<div class="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
							{#each servicesLinks as link}
								<a
									href={link.href}
									class="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/30
										{$page.url.pathname === link.href ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' : 'text-gray-700 dark:text-gray-300'}"
									onclick={closeServicesDropdown}
								>
									{link.label}
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<ThemeToggle />
				<a
					href="/booking"
					class="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-2.5 text-base font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors"
				>
					Book Now
				</a>
			</div>

			<!-- Mobile menu button -->
			<button
				type="button"
				class="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
		<div class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
			<div class="space-y-1 px-6 pb-4 pt-3">
				<div class="flex items-center justify-between pb-3 mb-3 border-b border-gray-200 dark:border-gray-800">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
					<ThemeToggle />
				</div>
				{#each navLinks as link}
					<a
						href={link.href}
						class="block rounded-xl px-4 py-3 text-base font-medium transition-colors
							{$page.url.pathname === link.href
								? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
								: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}"
						onclick={closeMobileMenu}
					>
						{link.label}
					</a>
				{/each}

				<!-- Services Mobile Submenu -->
				<div class="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
					<p class="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Services</p>
					{#each servicesLinks as link}
						<a
							href={link.href}
							class="block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors
								{$page.url.pathname === link.href
									? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
									: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}"
							onclick={closeMobileMenu}
						>
							{link.label}
						</a>
					{/each}
				</div>

				<a
					href="/booking"
					class="block rounded-xl bg-emerald-600 dark:bg-emerald-500 px-4 py-3 text-base font-semibold text-white hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors mt-2"
					onclick={closeMobileMenu}
				>
					Book Now
				</a>
			</div>
		</div>
	{/if}
</header>
