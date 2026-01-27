<script lang="ts">
	import { Heart, Clock, Shield, Users } from '@lucide/svelte';

	const features = [
		{
			icon: Heart,
			title: 'Compassionate Care',
			description: 'Professional nurses who treat you like family, providing personalized attention in the comfort of your home.'
		},
		{
			icon: Clock,
			title: 'Flexible Scheduling',
			description: 'Book appointments that fit your schedule. Available 24/7 for urgent care needs.'
		},
		{
			icon: Shield,
			title: 'Licensed & Insured',
			description: 'All our healthcare professionals are fully licensed, certified, and background-checked for your safety.'
		},
		{
			icon: Users,
			title: 'Family-Centered',
			description: 'We involve your loved ones in the care process, ensuring everyone feels supported and informed.'
		}
	];
</script>

<svelte:head>
	<title>SESI Healthcare - Home Nursing Services</title>
	<meta name="description" content="Professional home healthcare services delivered with compassion. Book trusted nurses for in-home care." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden">
	<!-- Background Image with Dark Overlay -->
	<div class="absolute inset-0 z-0">
		<img
			src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&h=1080&fit=crop&q=80"
			alt="African healthcare professional providing home care"
			class="w-full h-full object-cover"
		/>
		<!-- Dark overlay for text contrast -->
		<div class="absolute inset-0 bg-linear-to-r from-gray-900/85 via-gray-900/75 to-gray-900/70"></div>
	</div>

	<div class="relative z-10 container mx-auto px-6 py-32 sm:px-8 lg:px-12 lg:py-40">
		<div class="max-w-3xl animate-fade-in-up">
			<h1 class="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight mb-8">
				Quality Healthcare in the
				<span class="text-emerald-400">Comfort of Your Home</span>
			</h1>
			<p class="text-xl text-gray-100 sm:text-2xl leading-relaxed mb-12">
				Professional home nursing and healthcare services delivered with compassion and excellence.
				Your health and comfort are our priority.
			</p>
			<div class="flex flex-col sm:flex-row gap-4">
				<a
					href="/booking"
					class="group inline-flex items-center justify-center rounded-xl bg-emerald-600 px-10 py-4 text-lg font-semibold text-white hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
				>
					Book an Appointment
					<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="/services"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300"
				>
					View Services
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="py-32 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-20">
			<h2 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">Why Choose SESI Healthcare</h2>
			<p class="text-xl text-gray-600 max-w-2xl mx-auto">
				We provide exceptional care that puts your needs first
			</p>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-2 max-w-5xl mx-auto">
			{#each features as feature}
				<div class="flex gap-5 items-start group">
					<div class="shrink-0 rounded-2xl bg-emerald-100 p-5 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
						<svelte:component this={feature.icon} class="h-8 w-8" />
					</div>
					<div>
						<h3 class="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
						<p class="text-gray-600 leading-relaxed">{feature.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-emerald-600 py-24">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-4xl font-bold text-white sm:text-5xl mb-6">
				Ready to Get Started?
			</h2>
			<p class="text-xl text-emerald-50 mb-10 leading-relaxed">
				Book an appointment today and experience quality healthcare at home. Our professional team is ready to care for you and your loved ones.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/booking"
					class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
				>
					Book Now
					<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="/contact"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300"
				>
					Contact Us
				</a>
			</div>
		</div>
	</div>
</section>
