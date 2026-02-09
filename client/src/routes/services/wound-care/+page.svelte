<script lang="ts">
	import { Bandage, CheckCircle2, Clock, Shield } from '@lucide/svelte';
	import { Hero } from '$lib';

	const services = [
		{
			name: 'Acute Wound Care',
			description: 'Treatment of fresh wounds including cuts, lacerations, and post-surgical incisions.',
			features: [
				'Wound cleaning and debridement',
				'Sterile dressing application',
				'Infection prevention protocols',
				'Pain management support'
			]
		},
		{
			name: 'Chronic Wound Management',
			description: 'Specialized care for slow-healing wounds such as diabetic ulcers and pressure sores.',
			features: [
				'Advanced wound assessment',
				'Moisture balance therapy',
				'Pressure relief strategies',
				'Nutrition guidance for healing'
			]
		},
		{
			name: 'Burn Care',
			description: 'Professional treatment of thermal, chemical, and electrical burns.',
			features: [
				'Burn severity assessment',
				'Specialized burn dressings',
				'Scar prevention care',
				'Follow-up monitoring'
			]
		},
		{
			name: 'Post-Surgical Wound Care',
			description: 'Expert care for surgical incisions and wound sites following medical procedures.',
			features: [
				'Suture/staple removal',
				'Surgical site monitoring',
				'Complication detection',
				'Recovery progress tracking'
			]
		}
	];

	const whyChooseUs = [
		{
			icon: Shield,
			title: 'Certified Specialists',
			description: 'Our nurses are certified in advanced wound care techniques and protocols.'
		},
		{
			icon: Clock,
			title: 'Regular Monitoring',
			description: 'Scheduled visits to track healing progress and adjust treatment plans.'
		},
		{
			icon: CheckCircle2,
			title: 'Evidence-Based Care',
			description: 'Treatment based on latest clinical guidelines and best practices.'
		}
	];
</script>

<svelte:head>
	<title>Wound Care Services - SESI Healthcare</title>
	<meta name="description" content="Professional wound care services including acute wounds, chronic wounds, burns, and post-surgical care." />
</svelte:head>

<Hero
	title="Expert Wound Care <br/>at Home"
	subtitle="Professional wound management delivered by certified specialists for optimal healing outcomes."
	badge="Wound Care Services"
	variant="gradient"
	decorative={true}
/>

<!-- Services Overview -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Our Wound Care Services</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Comprehensive wound management from initial assessment to complete healing
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-6xl mx-auto">
			{#each services as service}
				<div class="rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100">
					<h3 class="text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
					<p class="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
					<div class="space-y-3">
						<p class="text-sm font-semibold text-gray-900 uppercase tracking-wide">What's included:</p>
						<ul class="space-y-2">
							{#each service.features as feature}
								<li class="flex items-start text-sm text-gray-600">
									<svg class="mr-2 h-5 w-5 shrink-0 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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

<!-- Why Choose Us -->
<section class="py-24 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Wound Care Services</h2>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-3 max-w-5xl mx-auto">
			{#each whyChooseUs as item}
				<div class="flex gap-4 items-start">
					<div class="shrink-0 rounded-2xl bg-emerald-100 p-4 text-emerald-600">
						<svelte:component this={item.icon} class="h-7 w-7" />
					</div>
					<div>
						<h3 class="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
						<p class="text-gray-600 leading-relaxed">{item.description}</p>
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
				Need Wound Care Services?
			</h2>
			<p class="text-xl text-emerald-50 mb-10 leading-relaxed">
				Book an appointment with our certified wound care specialists today.
			</p>
			<a
				href="/booking"
				class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
			>
				Book Wound Care Service
				<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</div>
</section>
