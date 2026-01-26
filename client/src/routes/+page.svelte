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
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 animate-gradient">
	<!-- Background Image with Overlay -->
	<div class="absolute inset-0 z-0">
		<img
			src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1600&h=900&fit=crop&q=80"
			alt="Healthcare professional with patient"
			class="w-full h-full object-cover opacity-10"
		/>
	</div>

	<div class="relative z-10 container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
		<div class="mx-auto max-w-3xl text-center animate-fade-in-up">
			<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight">
				Quality Healthcare in the
				<span class="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">Comfort of Your Home</span>
			</h1>
			<p class="mt-8 text-xl text-gray-700 sm:text-2xl leading-relaxed">
				Professional home nursing and healthcare services delivered with compassion and excellence.
				Your health and comfort are our priority.
			</p>
			<div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/booking"
					class="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-10 py-4 text-lg font-semibold text-white hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
				>
					Book an Appointment
					<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="/services"
					class="inline-flex items-center justify-center rounded-xl border-2 border-emerald-500 bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-emerald-50 transition-all duration-300 hover:scale-105"
				>
					View Services
				</a>
			</div>
		</div>
	</div>

	<!-- Decorative elements -->
	<div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
</section>

<!-- Features Section -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20 animate-fade-in-up">
			<h2 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">Why Choose SESI Healthcare</h2>
			<p class="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
				We provide exceptional care that puts your needs first
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each features as feature}
				<div class="group relative rounded-2xl border border-gray-200 bg-white p-8 hover:border-emerald-300 hover-lift">
					<div class="mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 p-4 text-emerald-600 group-hover:from-emerald-500 group-hover:to-green-500 group-hover:text-white transition-all duration-300">
						<svelte:component this={feature.icon} class="h-7 w-7" />
					</div>
					<h3 class="mb-3 text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{feature.title}</h3>
					<p class="text-gray-600 leading-relaxed">{feature.description}</p>

					<!-- Decorative corner accent -->
					<div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 py-20">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
	</div>

	<!-- Background Image -->
	<div class="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
		<img
			src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&q=80"
			alt="Happy healthcare patient"
			class="w-full h-full object-cover opacity-20"
		/>
	</div>

	<div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center lg:text-left">
			<h2 class="text-4xl font-bold text-white sm:text-5xl mb-6">
				Ready to Get Started?
			</h2>
			<p class="text-xl text-white/90 mb-10 leading-relaxed">
				Book an appointment today and experience quality healthcare at home. Our professional team is ready to care for you and your loved ones.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
				<a
					href="/booking"
					class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
				>
					Book Now
					<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="/contact"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white bg-transparent px-10 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
				>
					Contact Us
				</a>
			</div>
		</div>
	</div>
</section>
