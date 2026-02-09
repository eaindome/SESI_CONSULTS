<script lang="ts">
	import { Stethoscope, Syringe, Heart, Activity, Baby, Users2 } from '@lucide/svelte';
	import { Hero } from '$lib';

	const services = [
		{
			icon: Stethoscope,
			name: 'General Nursing Care',
			description: 'Comprehensive nursing care including vital signs monitoring, medication administration, and health assessments.',
			features: [
				'Vital signs monitoring',
				'Medication management',
				'Health status assessments',
				'Care plan coordination'
			],
			image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop&q=80'
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
			image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&q=80'
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
			image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80'
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
			image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop&q=80'
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
			image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&q=80'
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
			image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600&fit=crop&q=80'
		}
	];
</script>

<svelte:head>
	<title>Home Care Services - SESI Healthcare</title>
	<meta name="description" content="Comprehensive home healthcare services including nursing care, injections, post-operative care, and more." />
</svelte:head>

<Hero
	title="Professional Home <br/>Care Services"
	subtitle="Quality healthcare delivered in the comfort and safety of your home by our experienced nursing team."
	badge="Home Care"
	variant="gradient"
	decorative={true}
/>

<!-- Services Grid -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Our Home Care Services</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				From routine care to specialized nursing - we bring professional healthcare to your doorstep
			</p>
		</div>

		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2 max-w-7xl mx-auto">
			{#each services as service}
				<div class="group rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
					<!-- Service Image -->
					<div class="relative h-64 overflow-hidden">
						<img
							src={service.image}
							alt="Healthcare professional providing {service.name.toLowerCase()} services to a patient"
							loading="lazy"
							decoding="async"
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
						<div class="absolute bottom-4 left-4 inline-flex items-center justify-center rounded-xl bg-emerald-600 p-3" aria-hidden="true">
							<svelte:component this={service.icon} class="h-6 w-6 text-white" />
						</div>
					</div>

					<!-- Service Content -->
					<div class="p-8">
						<h3 class="mb-4 text-2xl font-bold text-gray-900">{service.name}</h3>
						<p class="mb-6 text-gray-600 leading-relaxed">{service.description}</p>
						<div class="space-y-3">
							<p class="text-sm font-semibold text-gray-900 uppercase tracking-wide">What's included:</p>
							<ul class="space-y-3">
								{#each service.features as feature}
									<li class="flex items-start text-base text-gray-600">
										<svg class="mr-3 h-5 w-5 shrink-0 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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
<section class="py-24 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
			<p class="text-xl text-gray-600">
				Getting started is simple and straightforward
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					1
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">Book Online</h3>
					<p class="text-gray-600 leading-relaxed">
						Choose your service and select a convenient date and time through our easy-to-use booking system.
					</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					2
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">We Confirm</h3>
					<p class="text-gray-600 leading-relaxed">
						Our team will confirm your appointment and send you details about your assigned healthcare professional.
					</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					3
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">Receive Care</h3>
					<p class="text-gray-600 leading-relaxed">
						Your nurse arrives at your home at the scheduled time to provide professional, compassionate care.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-emerald-600 py-24">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-4xl font-bold text-white sm:text-5xl mb-6">
				Ready to Book Home Care?
			</h2>
			<p class="text-xl text-emerald-50 mb-10 leading-relaxed">
				Schedule your home healthcare appointment today and experience quality care delivered with compassion.
			</p>
			<a
				href="/booking"
				class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
			>
				Book Home Care Service
				<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</div>
</section>
