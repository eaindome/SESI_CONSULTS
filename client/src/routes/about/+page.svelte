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
<section class="bg-gray-50 py-24 sm:py-32">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
				About SESI Healthcare
			</h1>
			<p class="text-xl text-gray-600 leading-relaxed">
				Dedicated to bringing professional healthcare to the comfort of your home
			</p>
		</div>
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

		<div class="grid grid-cols-1 gap-12 md:grid-cols-3 max-w-5xl mx-auto">
			{#each values as value}
				<div class="text-center">
					<div class="mb-6 inline-flex items-center justify-center rounded-full bg-emerald-600 p-5 text-white">
						<svelte:component this={value.icon} class="h-8 w-8" />
					</div>
					<h3 class="mb-4 text-xl font-bold text-gray-900">{value.title}</h3>
					<p class="text-gray-600 leading-relaxed">{value.description}</p>
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
