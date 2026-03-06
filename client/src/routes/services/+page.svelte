<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Stethoscope, Syringe, Heart, Activity, Baby, Users2, Check } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const services = [
		{
			id: 'general-nursing',
			icon: Stethoscope,
			name: 'General Nursing Care',
			description: 'Comprehensive nursing care including vital signs monitoring, medication administration, wound care, and health assessments.',
			features: [
				'Vital signs monitoring',
				'Medication management',
				'Wound care and dressing',
				'Health status assessments'
			],
			image: '/images/services/general-nursing.webp'
		},
		{
			id: 'injection-services',
			icon: Syringe,
			name: 'Injection Services',
			description: 'Professional administration of injections and intravenous medications in the comfort of your home.',
			features: [
				'Intramuscular injections',
				'Subcutaneous injections',
				'IV therapy administration',
				'Insulin administration'
			],
			image: '/images/services/injection.webp'
		},
		{
			id: 'post-operative-care',
			icon: Activity,
			name: 'Post-Operative Care',
			description: 'Specialized care for patients recovering from surgery, ensuring safe and comfortable recovery at home.',
			features: [
				'Surgical site monitoring',
				'Pain management support',
				'Mobility assistance',
				'Recovery progress tracking'
			],
			image: '/images/services/post-op.webp'
		},
		{
			id: 'chronic-disease-management',
			icon: Heart,
			name: 'Chronic Disease Management',
			description: 'Ongoing care and support for patients with chronic conditions such as diabetes, hypertension, and heart disease.',
			features: [
				'Regular health monitoring',
				'Medication adherence support',
				'Lifestyle coaching',
				'Symptom management'
			],
			image: '/images/services/chronic-disease.webp'
		},
		{
			id: 'elderly-care',
			icon: Users2,
			name: 'Elderly Care',
			description: 'Compassionate care for elderly patients, focusing on maintaining independence and quality of life.',
			features: [
				'Daily living assistance',
				'Fall prevention',
				'Medication reminders',
				'Companionship and support'
			],
			image: '/images/services/elderly-care.webp'
		},
		{
			id: 'maternal-child-care',
			icon: Baby,
			name: 'Maternal & Child Care',
			description: 'Specialized care for new mothers and infants, including postnatal support and newborn care.',
			features: [
				'Postnatal mother care',
				'Newborn care guidance',
				'Breastfeeding support',
				'Health monitoring'
			],
			image: '/images/services/maternal-child.webp'
		}
	];

	// Animation state
	let isHeroVisible = $state(false);
	let cardElements: HTMLElement[] = [];
	let isCardVisible = $state(Array(services.length).fill(false));

	onMount(() => {
		// Trigger hero animations
		setTimeout(() => isHeroVisible = true, 100);

		// Setup staggered card animations
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const index = cardElements.indexOf(entry.target as HTMLElement);
					if (index !== -1) {
						setTimeout(() => {
							isCardVisible[index] = true;
						}, index * 150); // Staggered delay
					}
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });

		cardElements.forEach(el => observer.observe(el));

		return () => {
			cardElements.forEach(el => observer.unobserve(el));
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Our Services - SESI Homecare & Medical Supplies</title>
	<meta name="description" content="Comprehensive home healthcare services including nursing care, injections, post-operative care, and more." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-linear-to-br from-[#1a5f4a] to-[#0d3d2d] py-24 sm:py-32">
	<!-- SVG Pattern Overlay -->
	<div class="absolute inset-0 opacity-5 pointer-events-none">
		<svg width="100%" height="100%">
			<pattern id="service-dots" width="20" height="20" patternUnits="userSpaceOnUse">
				<circle cx="3" cy="3" r="1.5" fill="currentColor" class="text-white" />
			</pattern>
			<rect width="100%" height="100%" fill="url(#service-dots)" />
		</svg>
	</div>

	<!-- Decorative circles - varied sizes and positions -->
	<div class="absolute top-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
	<div class="absolute top-40 right-40 w-64 h-64 bg-[#4caf50]/10 rounded-full blur-3xl"></div>
	<div class="absolute bottom-10 left-20 w-80 h-80 bg-white/8 rounded-full blur-3xl"></div>
	<div class="absolute bottom-32 left-40 w-56 h-56 bg-[#4caf50]/10 rounded-full blur-3xl"></div>
	<div class="absolute top-1/2 left-10 w-72 h-72 bg-[#4caf50]/8 rounded-full blur-3xl"></div>
	<div class="absolute top-1/3 right-1/2 w-48 h-48 bg-white/12 rounded-full blur-3xl"></div>

	<!-- Small accent dots -->
	<div class="absolute top-1/4 right-1/4 w-3 h-3 bg-white/40 rounded-full"></div>
	<div class="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[#4caf50]/50 rounded-full"></div>
	<div class="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-white/30 rounded-full"></div>
	<div class="absolute top-1/2 left-1/4 w-2 h-2 bg-[#4caf50]/40 rounded-full"></div>

	<div class="relative container mx-auto px-6 sm:px-8 lg:px-12">
		{#if isHeroVisible}
			<div class="mx-auto max-w-3xl text-center">
				<div in:fly={{ y: 20, duration: 600, delay: 0 }} class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
					Our Services
				</div>
				<h1 in:fly={{ y: 30, duration: 700, delay: 200 }} class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
					Professional Healthcare Services at Home
				</h1>
				<p in:fly={{ y: 20, duration: 600, delay: 400 }} class="text-xl text-white/90 leading-relaxed">
					Tailored care delivered with compassion and expertise, right where you feel most comfortable.
				</p>
			</div>
		{/if}
	</div>

	<!-- Bottom wave separator -->
	<!-- <div class="absolute bottom-0 left-0 right-0">
		<svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
			<path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 21.3C1200 21 1320 27 1380 29.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="white"/>
		</svg>
	</div> -->
</section>

<!-- Services Grid -->
<section class="py-16 md:py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2 max-w-7xl mx-auto">
			{#each services as service, i (i)}
				<div
					bind:this={cardElements[i]}
					class="transition-all duration-700 {isCardVisible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
				>
					<Card hoverable padding="none" class="group overflow-hidden">
						<!-- Service Image -->
						<div class="relative h-64 overflow-hidden">
							<img
								src={service.image}
								alt={service.name}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
							<div class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
							<div class="absolute bottom-4 left-4 inline-flex items-center justify-center rounded-xl bg-[#1a5f4a] p-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
								<svelte:component this={service.icon} class="h-6 w-6 text-white" />
							</div>
						</div>

						<!-- Service Content -->
						<div class="p-5 sm:p-8">
							<h3 class="mb-4 text-2xl font-bold text-gray-900">{service.name}</h3>
							<p class="mb-6 text-gray-600 leading-relaxed">{service.description}</p>
							<div class="space-y-3">
								<p class="text-sm font-semibold text-gray-900 uppercase tracking-wide">What's included:</p>
								<ul class="space-y-3">
									{#each service.features as feature, idx (idx)}
										<li class="flex items-start text-base text-gray-600 transition-all duration-300" style="transition-delay: {idx * 50}ms">
											<Check class="mr-3 h-5 w-5 shrink-0 text-white/900 mt-0.5" />
											{feature}
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</Card>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How It Works -->
<section class="py-16 md:py-24 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
			<p class="text-xl text-gray-600">
				Getting started is simple and straightforward
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-[#1a5f4a] h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
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
				<div class="shrink-0 rounded-full bg-[#1a5f4a] h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
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
				<div class="shrink-0 rounded-full bg-[#1a5f4a] h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
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
<section class="bg-linear-to-br from-[#1a5f4a] to-[#0d3d2d] py-24">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-4xl font-bold text-white sm:text-5xl mb-6">
				Ready to Book a Service?
			</h2>
			<p class="text-xl text-white/90 mb-10 leading-relaxed">
				Schedule your home healthcare appointment today and experience quality care delivered with compassion.
			</p>
			<Button variant="inverse" size="lg" href="/booking" elevation>
				Book an Appointment
				<svg slot="icon" class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</Button>
		</div>
	</div>
</section>
