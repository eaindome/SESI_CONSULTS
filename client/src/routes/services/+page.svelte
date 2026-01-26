<script lang="ts">
	import { Stethoscope, Syringe, Heart, Activity, Baby, Users2 } from '@lucide/svelte';

	const services = [
		{
			icon: Stethoscope,
			name: 'General Nursing Care',
			description: 'Comprehensive nursing care including vital signs monitoring, medication administration, wound care, and health assessments.',
			features: [
				'Vital signs monitoring',
				'Medication management',
				'Wound care and dressing',
				'Health status assessments'
			]
		},
		{
			icon: Syringe,
			name: 'Injection Services',
			description: 'Professional administration of injections and intravenous medications in the comfort of your home.',
			features: [
				'Intramuscular injections',
				'Subcutaneous injections',
				'IV therapy administration',
				'Insulin administration'
			]
		},
		{
			icon: Activity,
			name: 'Post-Operative Care',
			description: 'Specialized care for patients recovering from surgery, ensuring safe and comfortable recovery at home.',
			features: [
				'Surgical site monitoring',
				'Pain management support',
				'Mobility assistance',
				'Recovery progress tracking'
			]
		},
		{
			icon: Heart,
			name: 'Chronic Disease Management',
			description: 'Ongoing care and support for patients with chronic conditions such as diabetes, hypertension, and heart disease.',
			features: [
				'Regular health monitoring',
				'Medication adherence support',
				'Lifestyle coaching',
				'Symptom management'
			]
		},
		{
			icon: Users2,
			name: 'Elderly Care',
			description: 'Compassionate care for elderly patients, focusing on maintaining independence and quality of life.',
			features: [
				'Daily living assistance',
				'Fall prevention',
				'Medication reminders',
				'Companionship and support'
			]
		},
		{
			icon: Baby,
			name: 'Maternal & Child Care',
			description: 'Specialized care for new mothers and infants, including postnatal support and newborn care.',
			features: [
				'Postnatal mother care',
				'Newborn care guidance',
				'Breastfeeding support',
				'Health monitoring'
			]
		}
	];
</script>

<svelte:head>
	<title>Our Services - SESI Healthcare</title>
	<meta name="description" content="Comprehensive home healthcare services including nursing care, injections, post-operative care, and more." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-teal-50 to-blue-50 py-16 sm:py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
				Our Healthcare Services
			</h1>
			<p class="mt-6 text-lg text-gray-600">
				Professional home healthcare services tailored to your needs
			</p>
		</div>
	</div>
</section>

<!-- Services Grid -->
<section class="py-16 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			{#each services as service}
				<div class="group rounded-xl border border-gray-200 bg-white p-8 hover:border-teal-200 hover:shadow-lg transition-all">
					<div class="mb-4 inline-flex items-center justify-center rounded-lg bg-teal-100 p-3 text-teal-600">
						<svelte:component this={service.icon} class="h-8 w-8" />
					</div>
					<h3 class="mb-3 text-2xl font-semibold text-gray-900">{service.name}</h3>
					<p class="mb-6 text-gray-600">{service.description}</p>
					<div class="space-y-2">
						<p class="text-sm font-medium text-gray-900">What's included:</p>
						<ul class="space-y-2">
							{#each service.features as feature}
								<li class="flex items-start text-sm text-gray-600">
									<svg class="mr-2 h-5 w-5 flex-shrink-0 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
									</svg>
									{feature}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How It Works -->
<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-gray-900">How It Works</h2>
			<p class="mt-4 text-lg text-gray-600">
				Getting started is simple and straightforward
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl mx-auto">
			<div class="text-center">
				<div class="mb-4 inline-flex items-center justify-center rounded-full bg-teal-100 h-16 w-16 text-teal-600 text-2xl font-bold">
					1
				</div>
				<h3 class="mb-2 text-xl font-semibold text-gray-900">Book Online</h3>
				<p class="text-gray-600">
					Choose your service and select a convenient date and time through our booking system.
				</p>
			</div>

			<div class="text-center">
				<div class="mb-4 inline-flex items-center justify-center rounded-full bg-teal-100 h-16 w-16 text-teal-600 text-2xl font-bold">
					2
				</div>
				<h3 class="mb-2 text-xl font-semibold text-gray-900">We Confirm</h3>
				<p class="text-gray-600">
					Our team will confirm your appointment and send you details about your assigned nurse.
				</p>
			</div>

			<div class="text-center">
				<div class="mb-4 inline-flex items-center justify-center rounded-full bg-teal-100 h-16 w-16 text-teal-600 text-2xl font-bold">
					3
				</div>
				<h3 class="mb-2 text-xl font-semibold text-gray-900">Receive Care</h3>
				<p class="text-gray-600">
					Your nurse arrives at your home at the scheduled time to provide professional care.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-teal-600 py-16">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold text-white sm:text-4xl">
				Ready to Book a Service?
			</h2>
			<p class="mt-4 text-lg text-teal-50">
				Schedule your home healthcare appointment today and experience quality care.
			</p>
			<div class="mt-8">
				<a
					href="/booking"
					class="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-teal-600 hover:bg-teal-50 transition-colors"
				>
					Book an Appointment
				</a>
			</div>
		</div>
	</div>
</section>
