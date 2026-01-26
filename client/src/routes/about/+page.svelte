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
<section class="bg-gradient-to-br from-teal-50 to-blue-50 py-16 sm:py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
				About SESI Healthcare
			</h1>
			<p class="mt-6 text-lg text-gray-600">
				Dedicated to bringing professional healthcare to the comfort of your home
			</p>
		</div>
	</div>
</section>

<!-- Story Section -->
<section class="py-16 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<h2 class="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
			<div class="prose prose-lg text-gray-600">
				<p class="mb-4">
					SESI Healthcare was founded with a simple yet powerful mission: to provide professional,
					compassionate healthcare services in the comfort and safety of patients' homes.
				</p>
				<p class="mb-4">
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
	</div>
</section>

<!-- Mission & Vision -->
<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
			<div class="rounded-xl border border-teal-200 bg-white p-8 shadow-sm">
				<div class="mb-4 inline-flex items-center justify-center rounded-lg bg-teal-100 p-3 text-teal-600">
					<Target class="h-8 w-8" />
				</div>
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
				<p class="text-gray-600 leading-relaxed">
					To deliver exceptional home healthcare services that empower patients to maintain their
					independence and quality of life while receiving professional medical care in a familiar,
					comfortable environment.
				</p>
			</div>

			<div class="rounded-xl border border-teal-200 bg-white p-8 shadow-sm">
				<div class="mb-4 inline-flex items-center justify-center rounded-lg bg-teal-100 p-3 text-teal-600">
					<Eye class="h-8 w-8" />
				</div>
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
				<p class="text-gray-600 leading-relaxed">
					To be the most trusted name in home healthcare, known for our commitment to excellence,
					compassion, and innovation in delivering patient-centered care that makes a real
					difference in people's lives.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Values -->
<section class="py-16 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-gray-900">Our Core Values</h2>
			<p class="mt-4 text-lg text-gray-600">
				The principles that guide everything we do
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
			{#each values as value}
				<div class="text-center">
					<div class="mb-4 inline-flex items-center justify-center rounded-full bg-teal-100 p-4 text-teal-600">
						<svelte:component this={value.icon} class="h-8 w-8" />
					</div>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">{value.title}</h3>
					<p class="text-gray-600">{value.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-teal-600 py-16">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold text-white sm:text-4xl">
				Experience Our Commitment to Care
			</h2>
			<p class="mt-4 text-lg text-teal-50">
				Join the families who trust SESI Healthcare for their home healthcare needs.
			</p>
			<div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/booking"
					class="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-teal-600 hover:bg-teal-50 transition-colors"
				>
					Book an Appointment
				</a>
				<a
					href="/team"
					class="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-base font-medium text-white hover:bg-teal-700 transition-colors"
				>
					Meet Our Team
				</a>
			</div>
		</div>
	</div>
</section>
