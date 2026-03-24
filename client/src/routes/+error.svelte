<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/Button.svelte';
	import {
		ClipboardX,
		Home,
		Calendar,
		Phone,
		ArrowLeft,
		Stethoscope,
		HeartPulse,
		AlertCircle
	} from '@lucide/svelte';

	// Reactive error status and message
	const status = $derived($page.status);
	const message = $derived($page.error?.message || 'An unexpected error occurred');
	const is404 = $derived(status === 404);
	const is500 = $derived(status >= 500);

	// Error content configuration based on status
	const errorConfig = $derived.by(() => {
		if (is404) {
			return {
				title: "Looks Like This Page Took a Sick Day",
				subtitle: "We couldn't find what you're looking for",
				description:
					"The page you're trying to reach might have been moved, deleted, or never existed. Don't worry, our team is here to help you find what you need.",
				icon: ClipboardX,
				iconColor: 'text-[#0288d1]', // Accent blue
				pulseColor: 'bg-[#0288d1]/20'
			};
		} else if (is500) {
			return {
				title: "We're Treating This Technical Issue",
				subtitle: 'Our medical team is on the case',
				description:
					"Something went wrong on our end, but we've been notified and are working to fix it. Your health is our priority, and we'll have things back to normal soon.",
				icon: Stethoscope,
				iconColor: 'text-[#d32f2f]', // Danger red
				pulseColor: 'bg-[#d32f2f]/20'
			};
		} else {
			return {
				title: 'Something Unexpected Happened',
				subtitle: 'An error occurred',
				description: message,
				icon: AlertCircle,
				iconColor: 'text-[#f4b400]', // Caution yellow
				pulseColor: 'bg-[#f4b400]/20'
			};
		}
	});

	// Quick navigation links
	const quickLinks = [
		{ label: 'Home', href: '/', icon: Home },
		{ label: 'Book Appointment', href: '/booking', icon: Calendar },
		{ label: 'Contact Us', href: '/contact', icon: Phone }
	];
</script>

<svelte:head>
	<title>{status} - {is404 ? 'Page Not Found' : 'Error'} | SESI Consults</title>
</svelte:head>

<div class="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
		<div class="w-full max-w-3xl">
			<!-- Error Card with animation -->
			<div
				class="animate-fade-in-up rounded-2xl bg-white p-8 shadow-xl sm:p-12"
				style="animation-delay: 0.1s;"
			>
				<!-- Icon with pulse animation -->
				<div class="mb-8 flex justify-center">
					<div class="relative">
						<!-- Pulse rings -->
						<div
							class="absolute inset-0 animate-ping rounded-full {errorConfig.pulseColor} opacity-75"
							style="animation-duration: 2s;"
						></div>
						<div
							class="absolute inset-0 animate-pulse rounded-full {errorConfig.pulseColor}"
							style="animation-duration: 3s;"
						></div>

						<!-- Icon container -->
						<div
							class="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg animate-scale-in"
							style="animation-delay: 0.3s;"
						>
							<errorConfig.icon
								class="h-12 w-12 {errorConfig.iconColor}"
								strokeWidth={2}
							/>
						</div>
					</div>
				</div>

				<!-- Error status code -->
				<div class="mb-4 text-center">
					<p
						class="text-6xl font-bold {errorConfig.iconColor} animate-scale-in sm:text-7xl"
						style="animation-delay: 0.2s;"
					>
						{status}
					</p>
				</div>

				<!-- Error title and description -->
				<div class="mb-8 text-center">
					<h1
						class="mb-3 text-2xl font-bold text-gray-900 animate-fade-in-up sm:text-3xl"
						style="animation-delay: 0.3s;"
					>
						{errorConfig.title}
					</h1>
					<p
						class="mb-2 text-lg text-[#1a5f4a] font-medium animate-fade-in-up"
						style="animation-delay: 0.4s;"
					>
						{errorConfig.subtitle}
					</p>
					<p
						class="mx-auto max-w-xl text-base text-gray-600 animate-fade-in-up"
						style="animation-delay: 0.5s;"
					>
						{errorConfig.description}
					</p>
				</div>

				<!-- Status indicator for 500 errors -->
				{#if is500}
					<div
						class="mb-8 flex items-center justify-center gap-2 text-sm text-gray-500 animate-fade-in-up"
						style="animation-delay: 0.6s;"
					>
						<HeartPulse class="h-4 w-4 text-[#4caf50] animate-pulse" />
						<span>Our team has been notified and is working on a fix</span>
					</div>
				{/if}

				<!-- Primary CTA Buttons -->
				<div
					class="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center animate-fade-in-up"
					style="animation-delay: 0.7s;"
				>
					{#if is404}
						<Button variant="primary" size="lg" icon={Home} href="/">
							Return to Home
						</Button>
						<Button variant="outline" size="lg" icon={Calendar} href="/booking">
							Book Appointment
						</Button>
					{:else}
						<Button variant="primary" size="lg" icon={ArrowLeft} href="/">
							Go Back Home
						</Button>
						<Button variant="outline" size="lg" icon={Phone} href="/contact">
							Contact Support
						</Button>
					{/if}
				</div>

				<!-- Quick Links Section -->
				<div
					class="border-t border-gray-200 pt-8 animate-fade-in-up"
					style="animation-delay: 0.8s;"
				>
					<p class="mb-4 text-center text-sm font-medium text-gray-700">Quick Navigation</p>
					<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
						{#each quickLinks as link}
							<a
								href={link.href}
								class="group flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-[#1a5f4a] hover:bg-[#1a5f4a]/5 hover:text-[#1a5f4a] hover:shadow-md"
							>
								<link.icon
									class="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
								/>
								{link.label}
							</a>
						{/each}
					</div>
				</div>

				<!-- Technical details (only show in development or for admins) -->
				{#if import.meta.env.DEV && message !== 'Not Found'}
					<div
						class="mt-6 rounded-lg bg-gray-50 p-4 animate-fade-in-up"
						style="animation-delay: 0.9s;"
					>
						<p class="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
							Technical Details (Dev Mode)
						</p>
						<p class="font-mono text-sm text-gray-700 break-words">{message}</p>
					</div>
				{/if}
			</div>

			<!-- Additional help text -->
			<div
				class="mt-6 text-center animate-fade-in-up"
				style="animation-delay: 1s;"
			>
				<p class="text-sm text-gray-600">
					Need immediate assistance?{' '}
					<a href="/contact" class="font-medium text-[#1a5f4a] hover:underline">
						Contact our support team
					</a>
					{' '}or call us at{' '}
					<a href="tel:+2348135071710" class="font-medium text-[#1a5f4a] hover:underline">
						+234 813 507 1710
					</a>
				</p>
			</div>
		</div>
</div>

<style>
	/* Ensure animations work properly */
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
