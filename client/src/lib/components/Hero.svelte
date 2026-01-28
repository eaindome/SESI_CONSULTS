<script lang="ts">
	interface Props {
		title: string;
		subtitle: string;
		badge?: string;
		decorative?: boolean;
		variant?: 'gradient' | 'image';
		imageUrl?: string;
		waveSeparator?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		title,
		subtitle,
		badge,
		decorative = true,
		variant = 'gradient',
		imageUrl,
		waveSeparator = false,
		children
	}: Props = $props();
</script>

<section class="relative overflow-hidden {variant === 'gradient' ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700' : ''} py-24 sm:py-32">
	{#if variant === 'image' && imageUrl}
		<!-- Background Image with Dark Overlay -->
		<div class="absolute inset-0 z-0">
			<img
				src={imageUrl}
				alt=""
				loading="eager"
				decoding="async"
				class="w-full h-full object-cover"
				role="presentation"
			/>
			<!-- Dark overlay for text contrast -->
			<div class="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/75 to-gray-900/70" aria-hidden="true"></div>
		</div>
	{/if}

	{#if decorative && variant === 'gradient'}
		<!-- Decorative circles - varied sizes and positions -->
		<div class="absolute top-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" aria-hidden="true"></div>
		<div class="absolute top-40 right-40 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" aria-hidden="true"></div>
		<div class="absolute bottom-10 left-20 w-80 h-80 bg-white/8 rounded-full blur-3xl" aria-hidden="true"></div>
		<div class="absolute bottom-32 left-40 w-56 h-56 bg-emerald-300/10 rounded-full blur-3xl" aria-hidden="true"></div>
		<div class="absolute top-1/2 left-10 w-72 h-72 bg-teal-300/8 rounded-full blur-3xl" aria-hidden="true"></div>
		<div class="absolute top-1/3 right-1/2 w-48 h-48 bg-white/12 rounded-full blur-3xl" aria-hidden="true"></div>

		<!-- Small accent dots -->
		<div class="absolute top-1/4 right-1/4 w-3 h-3 bg-white/40 rounded-full" aria-hidden="true"></div>
		<div class="absolute bottom-1/3 left-1/3 w-2 h-2 bg-emerald-300/50 rounded-full" aria-hidden="true"></div>
		<div class="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-white/30 rounded-full" aria-hidden="true"></div>
		<div class="absolute top-1/2 left-1/4 w-2 h-2 bg-teal-200/40 rounded-full" aria-hidden="true"></div>
	{/if}

	<div class="relative {variant === 'image' ? 'z-10' : ''} container mx-auto px-6 sm:px-8 lg:px-12 {variant === 'image' ? 'lg:py-40 py-32' : ''}">
		<div class="mx-auto max-w-3xl text-center">
			{#if badge}
				<div class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 animate-fade-in">
					{badge}
				</div>
			{/if}
			<h1 class="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6 {variant === 'image' ? 'lg:text-7xl leading-tight' : ''} animate-fade-in-up">
				{@html title}
			</h1>
			<p class="text-xl leading-relaxed animate-fade-in {variant === 'image' ? 'text-white sm:text-2xl' : 'text-emerald-50'}" style="animation-delay: 0.2s;">
				{subtitle}
			</p>
			{#if children}
				<div class="mt-12">
					{@render children()}
				</div>
			{/if}
		</div>
	</div>

	<!-- Bottom wave separator -->
	{#if waveSeparator}
		<div class="absolute bottom-0 left-0 right-0 -mb-px" aria-hidden="true">
			<svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto block" role="presentation">
				<path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 21.3C1200 21 1320 27 1380 29.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="white"/>
			</svg>
		</div>
	{/if}
</section>
