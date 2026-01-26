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
			],
			image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop&q=80'
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
			],
			image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop&q=80'
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
			],
			image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop&q=80'
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
			],
			image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop&q=80'
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
			],
			image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=400&fit=crop&q=80'
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
			],
			image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop&q=80'
		}
	];
</script>

<svelte:head>
	<title>Our Services - SESI Healthcare</title>
	<meta name="description" content="Comprehensive home healthcare services including nursing care, injections, post-operative care, and more." />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20 sm:py-24">
	<div class="absolute inset-0 opacity-5">
		<img
			src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&h=600&fit=crop&q=80"
			alt="Healthcare services"
			class="w-full h-full object-cover"
		/>
	</div>
	<div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center animate-fade-in-up">
			<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
				Our Healthcare Services
			</h1>
			<p class="text-xl text-gray-700 leading-relaxed">
				Professional home healthcare services tailored to your needs. Delivering compassionate, expert care where you feel most comfortable.
			</p>
		</div>
	</div>
</section>

<!-- Services Grid -->
<section class="py-20 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
			{#each services as service}
				<div class="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-emerald-300 hover-lift">
					<!-- Service Image -->
					<div class="relative h-56 overflow-hidden image-overlay">
						<img
							src={service.image}
							alt={service.name}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
						/>
						<div class="absolute top-4 right-4 inline-flex items-center justify-center rounded-xl bg-white/90 backdrop-blur p-3 shadow-lg">
							<svelte:component this={service.icon} class="h-6 w-6 text-emerald-600" />
						</div>
					</div>

					<!-- Service Content -->
					<div class="p-8">
						<h3 class="mb-4 text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{service.name}</h3>
						<p class="mb-6 text-gray-600 leading-relaxed">{service.description}</p>
						<div class="space-y-3">
							<p class="text-sm font-semibold text-gray-900 uppercase tracking-wide">What's included:</p>
							<ul class="space-y-3">
								{#each service.features as feature}
									<li class="flex items-start text-base text-gray-600">
										<svg class="mr-3 h-6 w-6 flex-shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
										</svg>
										{feature}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How It Works -->
<section class="py-20 bg-gradient-to-br from-gray-50 to-emerald-50/30">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
			<p class="text-xl text-gray-600">
				Getting started is simple and straightforward
			</p>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-3 max-w-5xl mx-auto">
			<div class="group text-center">
				<div class="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500 h-20 w-20 text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
					1
				</div>
				<h3 class="mb-3 text-2xl font-bold text-gray-900">Book Online</h3>
				<p class="text-gray-600 leading-relaxed">
					Choose your service and select a convenient date and time through our easy-to-use booking system.
				</p>
			</div>

			<div class="group text-center">
				<div class="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500 h-20 w-20 text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
					2
				</div>
				<h3 class="mb-3 text-2xl font-bold text-gray-900">We Confirm</h3>
				<p class="text-gray-600 leading-relaxed">
					Our team will confirm your appointment and send you details about your assigned healthcare professional.
				</p>
			</div>

			<div class="group text-center">
				<div class="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500 h-20 w-20 text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
					3
				</div>
				<h3 class="mb-3 text-2xl font-bold text-gray-900">Receive Care</h3>
				<p class="text-gray-600 leading-relaxed">
					Your nurse arrives at your home at the scheduled time to provide professional, compassionate care.
				</p>
			</div>
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
				Ready to Book a Service?
			</h2>
			<p class="text-xl text-white/90 mb-10 leading-relaxed">
				Schedule your home healthcare appointment today and experience quality care delivered with compassion.
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
			</div>
		</div>
	</div>
</section>
