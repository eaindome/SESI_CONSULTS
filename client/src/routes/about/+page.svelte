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
<section class="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20 sm:py-24">
	<div class="absolute inset-0 opacity-5">
		<img
			src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=600&fit=crop&q=80"
			alt="Healthcare team"
			class="w-full h-full object-cover"
		/>
	</div>
	<div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center animate-fade-in-up">
			<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
				About SESI Healthcare
			</h1>
			<p class="text-xl text-gray-700 leading-relaxed">
				Dedicated to bringing professional healthcare to the comfort of your home
			</p>
		</div>
	</div>
</section>

<!-- Story Section -->
<section class="py-20 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-5xl">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
				<div class="rounded-2xl overflow-hidden shadow-xl">
					<img
						src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&q=80"
						alt="Healthcare professional caring for patient"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Mission & Vision -->
<section class="py-20 bg-gradient-to-br from-gray-50 to-emerald-50/30">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
			<div class="group rounded-2xl border border-emerald-200 bg-white p-10 shadow-lg hover-lift">
				<div class="mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 p-4 text-emerald-600 group-hover:from-emerald-500 group-hover:to-green-500 group-hover:text-white transition-all duration-300">
					<Target class="h-10 w-10" />
				</div>
				<h2 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
				<p class="text-lg text-gray-600 leading-relaxed">
					To deliver exceptional home healthcare services that empower patients to maintain their
					independence and quality of life while receiving professional medical care in a familiar,
					comfortable environment.
				</p>
			</div>

			<div class="group rounded-2xl border border-emerald-200 bg-white p-10 shadow-lg hover-lift">
				<div class="mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 p-4 text-emerald-600 group-hover:from-emerald-500 group-hover:to-green-500 group-hover:text-white transition-all duration-300">
					<Eye class="h-10 w-10" />
				</div>
				<h2 class="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
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
<section class="py-20 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
			<p class="text-xl text-gray-600">
				The principles that guide everything we do
			</p>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-3 max-w-5xl mx-auto">
			{#each values as value}
				<div class="group text-center">
					<div class="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500 p-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
						<svelte:component this={value.icon} class="h-10 w-10" />
					</div>
					<h3 class="mb-4 text-2xl font-bold text-gray-900">{value.title}</h3>
					<p class="text-lg text-gray-600 leading-relaxed">{value.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 py-20">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
	</div>

	<div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-4xl font-bold text-white sm:text-5xl mb-6">
				Experience Our Commitment to Care
			</h2>
			<p class="text-xl text-white/90 mb-10 leading-relaxed">
				Join the families who trust SESI Healthcare for their home healthcare needs.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/booking"
					class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
				>
					Book an Appointment
					<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="/team"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white bg-transparent px-10 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
				>
					Meet Our Team
				</a>
			</div>
		</div>
	</div>
</section>
