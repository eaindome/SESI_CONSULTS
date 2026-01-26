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
<section class="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50">
	<div class="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
				Quality Healthcare in the
				<span class="text-teal-600">Comfort of Your Home</span>
			</h1>
			<p class="mt-6 text-lg text-gray-600 sm:text-xl">
				Professional home nursing and healthcare services delivered with compassion and excellence.
				Your health and comfort are our priority.
			</p>
			<div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/booking"
					class="inline-flex items-center justify-center rounded-lg bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 transition-colors shadow-sm"
				>
					Book an Appointment
				</a>
				<a
					href="/services"
					class="inline-flex items-center justify-center rounded-lg border border-teal-600 bg-white px-8 py-3 text-base font-medium text-teal-600 hover:bg-teal-50 transition-colors"
				>
					View Services
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="py-20 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose SESI Healthcare</h2>
			<p class="mt-4 text-lg text-gray-600">
				We provide exceptional care that puts your needs first
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each features as feature}
				<div class="group relative rounded-xl border border-gray-200 bg-white p-6 hover:border-teal-200 hover:shadow-lg transition-all">
					<div class="mb-4 inline-flex items-center justify-center rounded-lg bg-teal-100 p-3 text-teal-600">
						<svelte:component this={feature.icon} class="h-6 w-6" />
					</div>
					<h3 class="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
					<p class="text-gray-600">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-teal-600 py-16">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold text-white sm:text-4xl">
				Ready to Get Started?
			</h2>
			<p class="mt-4 text-lg text-teal-50">
				Book an appointment today and experience quality healthcare at home.
			</p>
			<div class="mt-8">
				<a
					href="/booking"
					class="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-teal-600 hover:bg-teal-50 transition-colors shadow-sm"
				>
					Book Now
				</a>
			</div>
		</div>
	</div>
</section>
