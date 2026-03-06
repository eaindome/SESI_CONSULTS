<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { onMount } from 'svelte';
	import { Menu, X } from '@lucide/svelte';

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Services', href: '/services' },
		{ name: 'Contact', href: '/contact' }
	];

	const currentPath = derived(page, ($page) => $page.url.pathname);

	// Variables for hover effects
	let isHovered = false;

	// Variables for dynamic background
	let isScrolled = false;
	let isOnColoredSection = false;
	let navbarElement: HTMLElement;
	let mobileMenuOpen = false;

	// Variables for scroll animation
	let isVisible = true;
	let lastScrollY = 0;
	let scrollingDown = false;
	let scrollTimer: ReturnType<typeof setTimeout> | null = null;

	// TMT-style color CSS variables
	const navStyle = `
		--trustGreen: #1a5f4a;
		--cautionYellow: #f4b400;
	`;

	// Page-specific configurations (matching TMT's pageConfig pattern for SESI's routes)
	const pageConfig: Record<string, {
		defaultNavColor: string;
		heroHeight: number;
		sections: { top: number; bottom: number; colored: boolean }[];
	}> = {
		'/': {
			defaultNavColor: 'green', // dark image hero — white text on dark bg
			heroHeight: 650,
			sections: [{ top: 0, bottom: 650, colored: false }]
		},
		'/about': {
			defaultNavColor: 'white', // green hero — white navbar stands out
			heroHeight: 450,
			sections: [{ top: 0, bottom: 450, colored: true }]
		},
		'/services': {
			defaultNavColor: 'white',
			heroHeight: 450,
			sections: [{ top: 0, bottom: 450, colored: true }]
		},
		'/contact': {
			defaultNavColor: 'white',
			heroHeight: 450,
			sections: [{ top: 0, bottom: 450, colored: true }]
		},
		'/booking': {
			defaultNavColor: 'white',
			heroHeight: 450,
			sections: [{ top: 0, bottom: 450, colored: true }]
		}
	};

	function handleScroll() {
		const scrollY = window.scrollY;
		const path = $currentPath;

		scrollingDown = scrollY > lastScrollY;

		// Don't hide navbar if at the top of the page
		if (scrollY < 50) {
			isVisible = true;
		} else if (scrollingDown && isVisible && scrollY > 150) {
			isVisible = false;
		} else if (!scrollingDown && !isVisible) {
			isVisible = true;
		}

		lastScrollY = scrollY;

		// Handle colored section detection
		isOnColoredSection = false;
		if (path in pageConfig) {
			const config = pageConfig[path];
			config.sections.forEach((section) => {
				if (scrollY >= section.top && scrollY < section.bottom && section.colored) {
					isOnColoredSection = true;
				}
			});
		}

		isScrolled = scrollY > 20;

		if (scrollTimer) clearTimeout(scrollTimer);

		if (scrollY > 150) {
			scrollTimer = setTimeout(() => {
				isVisible = false;
			}, 3000);
		}
	}

	function resetAutoHideTimer() {
		if (scrollTimer) clearTimeout(scrollTimer);
		isVisible = true;
	}

	onMount(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (scrollTimer) clearTimeout(scrollTimer);
		};
	});

	// Get default color for current page
	$: defaultNavColor =
		$currentPath in pageConfig ? pageConfig[$currentPath].defaultNavColor : 'green';

	// Compute background style — identical logic to TMT
	$: navbarBg = isScrolled
		? isOnColoredSection
			? 'bg-gradient-to-r from-white/95 to-gray-50/95 text-[#1a5f4a] border-white/20'
			: 'bg-gradient-to-r from-[#1a5f4a]/95 to-[#267d63]/95 text-white border-white/10'
		: defaultNavColor === 'white'
			? 'bg-gradient-to-r from-white/90 to-gray-50/90 text-[#1a5f4a] border-white/20 backdrop-blur-sm'
			: 'bg-gradient-to-r from-[#1a5f4a]/90 to-[#267d63]/90 text-white border-white/10 backdrop-blur-sm';

	$: logoBg =
		(isScrolled && isOnColoredSection) || (!isScrolled && defaultNavColor === 'white')
			? 'bg-[#1a5f4a]'
			: 'bg-white';

	$: logoColor =
		(isScrolled && isOnColoredSection) || (!isScrolled && defaultNavColor === 'white')
			? 'white'
			: '#1a5f4a';

	$: isWhiteNav =
		(isScrolled && isOnColoredSection) || (!isScrolled && defaultNavColor === 'white');
</script>

<!-- Desktop Navbar - Floating Pill (matches TMT exactly) -->
<div class="fixed top-0 right-0 left-0 z-50 flex justify-center">
	<nav
		bind:this={navbarElement}
		style={navStyle}
		class="mx-auto mt-6 flex w-fit items-center justify-between rounded-full border px-6
		       py-2 transition-all duration-300 {navbarBg}
		       {isHovered ? 'shadow-2xl' : 'shadow-lg'}
		       transform transition-transform duration-500 ease-in-out
		       {isVisible ? 'translate-y-0' : '-translate-y-24'}"
		on:mouseenter={() => {
			isHovered = true;
			resetAutoHideTimer();
		}}
		on:mouseleave={() => (isHovered = false)}
		on:focus={() => resetAutoHideTimer()}
	>
		<div class="flex items-center gap-8">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-2.5 transition-transform duration-300 hover:scale-105" aria-label="SESI Homecare Home">
				<img src={isWhiteNav ? '/images/logo/logo_trans_background.png' : '/images/logo/logo_transparent.png'} alt="SESI Homecare" class="h-10 w-10 object-contain rounded-lg transition-all duration-300" />
				<div class="flex flex-col leading-tight">
					<span class="font-bold text-lg leading-none transition-colors duration-300">SESI Homecare</span>
					<span class="text-xs font-medium tracking-wide transition-colors duration-300 opacity-80">Medical Supplies &amp; Services</span>
				</div>
			</a>

			<!-- Nav Links -->
			{#each links as link}
				<a
					href={link.href}
					class="relative px-1 py-2 font-medium transition-all duration-200
					       {$currentPath === link.href ? 'font-semibold' : 'opacity-85 hover:opacity-100'} nav-link"
				>
					{link.name}
					{#if $currentPath === link.href}
						<div class="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#f4b400]"></div>
					{/if}
				</a>
			{/each}
		</div>
	</nav>
</div>

<!-- Mobile Navbar - Traditional Sticky -->
<header
	class="sticky top-0 z-50 w-full md:hidden {navbarBg} backdrop-blur-md transition-all duration-300"
	style={navStyle}
>
	<nav class="container mx-auto px-6">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-2">
				<img src={isWhiteNav ? '/images/logo/logo_trans_background.png' : '/images/logo/logo_transparent.png'} alt="SESI Homecare" class="h-9 w-9 object-contain shrink-0 rounded-lg transition-all duration-300" />
				<div class="flex flex-col leading-tight">
					<span class="font-bold text-base leading-none transition-colors duration-300">SESI Homecare</span>
					<span class="text-xs font-medium tracking-wide transition-colors duration-300 opacity-80">Medical Supplies &amp; Services</span>
				</div>
			</a>

			<!-- Mobile menu toggle -->
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-full p-2 transition-colors
				       {isScrolled && isOnColoredSection ? 'hover:bg-gray-100' : 'hover:bg-white/10'}"
				on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-expanded={mobileMenuOpen}
				aria-label="Toggle menu"
			>
				{#if mobileMenuOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
			</button>
		</div>

		<!-- Mobile menu -->
		{#if mobileMenuOpen}
			<div class="border-t {isOnColoredSection ? 'border-gray-200' : 'border-white/20'} py-4">
				<div class="space-y-1">
					{#each links as link}
						<a
							href={link.href}
							class="flex items-center rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200
							       {$currentPath === link.href
								       ? isOnColoredSection ? 'bg-[#1a5f4a]/10 text-[#1a5f4a] font-semibold' : 'bg-white/20 font-semibold'
								       : isOnColoredSection ? 'hover:bg-gray-100' : 'hover:bg-white/10'}"
							on:click={() => (mobileMenuOpen = false)}
						>
							{link.name}
							{#if $currentPath === link.href}
								<span class="ml-auto h-1.5 w-1.5 rounded-full bg-[#f4b400]"></span>
							{/if}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</nav>
</header>



<style>
	/* Exact TMT glow/shadow */
	nav {
		box-shadow: 0 4px 20px rgba(26, 95, 74, 0.15);
	}

	nav:hover {
		box-shadow: 0 6px 25px rgba(26, 95, 74, 0.25);
	}

	/* Links turn yellow on hover — matching TMT's CSS variable approach */
	.nav-link:hover {
		color: var(--cautionYellow);
	}
</style>
