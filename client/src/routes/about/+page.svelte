<script lang="ts">
	import { Target, Eye, Award, Heart, Shield } from '@lucide/svelte';

	const values = [
		{
			icon: Heart,
			title: 'Compassion',
			description: 'We treat every patient with the kindness and respect they deserve, as we would our own family.'
		},
		{
			icon: Award,
			title: 'Excellence',
			description: 'We maintain the highest standards of professional healthcare delivery in every service we provide.'
		},
		{
			icon: Shield,
			title: 'Trust',
			description: 'We build lasting relationships through reliability, transparency, and consistent quality care.'
		}
	];
</script>

<svelte:head>
	<title>About Us - SESI Healthcare</title>
	<meta name="description" content="Learn about SESI Healthcare's mission to provide quality home healthcare services with compassion and excellence." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-700 py-24 sm:py-32">
	<!-- Decorative circles - varied sizes and positions -->
	<div class="absolute top-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
	<div class="absolute top-40 right-40 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl"></div>
	<div class="absolute bottom-10 left-20 w-80 h-80 bg-white/8 rounded-full blur-3xl"></div>
	<div class="absolute bottom-32 left-40 w-56 h-56 bg-emerald-300/10 rounded-full blur-3xl"></div>
	<div class="absolute top-1/2 left-10 w-72 h-72 bg-teal-300/8 rounded-full blur-3xl"></div>
	<div class="absolute top-1/3 right-1/2 w-48 h-48 bg-white/12 rounded-full blur-3xl"></div>

	<!-- Small accent dots -->
	<div class="absolute top-1/4 right-1/4 w-3 h-3 bg-white/40 rounded-full"></div>
	<div class="absolute bottom-1/3 left-1/3 w-2 h-2 bg-emerald-300/50 rounded-full"></div>
	<div class="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-white/30 rounded-full"></div>
	<div class="absolute top-1/2 left-1/4 w-2 h-2 bg-teal-200/40 rounded-full"></div>

	<div class="relative container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<div class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 animate-fade-in">
				Our Story
			</div>
			<h1 class="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6 animate-fade-in-up">
				Compassionate Care,<br/>Exceptional Service
			</h1>
			<p class="text-xl text-emerald-50 leading-relaxed animate-fade-in" style="animation-delay: 0.2s;">
				Dedicated to bringing professional healthcare to the comfort of your home
			</p>
		</div>
	</div>

	<!-- Bottom wave separator -->
	<div class="absolute bottom-0 left-0 right-0">
		<svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
			<path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 21.3C1200 21 1320 27 1380 29.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="white"/>
		</svg>
	</div>
</section>

<!-- Story Section -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-6xl">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<div>
					<h2 class="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
					<div class="space-y-6 text-lg text-gray-600 leading-relaxed">
						<p>
							SESI Healthcare was founded with a simple yet powerful mission: to provide professional,
							compassionate healthcare services in the comfort and safety of patients' homes.
						</p>
						<p>
							We understand that receiving care at home can make a significant difference in recovery
							and overall well-being. Our team of experienced healthcare professionals is dedicated
							to delivering personalized care that meets the unique needs of each patient and their family.
						</p>
						<p>
							From routine health monitoring to specialized nursing care, we are committed to ensuring
							that you or your loved ones receive the highest quality healthcare without the stress
							of traveling to a medical facility.
						</p>
					</div>
				</div>
				<div class="rounded-2xl overflow-hidden shadow-lg">
					<img
						src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=800&fit=crop&q=80"
						alt="Healthcare professional caring for patient"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Mission & Vision -->
<section class="py-24 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
			<div class="bg-white rounded-2xl p-10 shadow-sm">
				<div class="mb-6 inline-flex items-center justify-center rounded-xl bg-emerald-100 p-4 text-emerald-600">
					<Target class="h-8 w-8" />
				</div>
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
				<p class="text-lg text-gray-600 leading-relaxed">
					To deliver exceptional home healthcare services that empower patients to maintain their
					independence and quality of life while receiving professional medical care in a familiar,
					comfortable environment.
				</p>
			</div>

			<div class="bg-white rounded-2xl p-10 shadow-sm">
				<div class="mb-6 inline-flex items-center justify-center rounded-xl bg-emerald-100 p-4 text-emerald-600">
					<Eye class="h-8 w-8" />
				</div>
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
				<p class="text-lg text-gray-600 leading-relaxed">
					To be the most trusted name in home healthcare, known for our commitment to excellence,
					compassion, and innovation in delivering patient-centered care that makes a real
					difference in people's lives.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Values -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
			<p class="text-xl text-gray-600">
				The principles that guide everything we do
			</p>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-3 max-w-5xl mx-auto">
			{#each values as value}
				<div class="flex gap-4 items-start">
					<div class="shrink-0 rounded-full bg-emerald-600 p-4 text-white">
						<svelte:component this={value.icon} class="h-7 w-7" />
					</div>
					<div>
						<h3 class="mb-3 text-xl font-bold text-gray-900">{value.title}</h3>
						<p class="text-gray-600 leading-relaxed">{value.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-emerald-600 py-24">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-4xl font-bold text-white sm:text-5xl mb-6">
				Experience Our Commitment to Care
			</h2>
			<p class="text-xl text-emerald-50 mb-10 leading-relaxed">
				Join the families who trust SESI Healthcare for their home healthcare needs.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/booking"
					class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
				>
					Book an Appointment
					<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="/team"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300"
				>
					Meet Our Team
				</a>
			</div>
		</div>
	</div>
</section>
