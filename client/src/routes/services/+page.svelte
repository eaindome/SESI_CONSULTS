<script lang="ts">
	import { Bandage, Home, ShoppingBag, Stethoscope, GraduationCap } from '@lucide/svelte';
	import { Hero } from '$lib';

	const serviceCategories = [
		{
			icon: Bandage,
			name: 'Wound Care Services',
			description: 'Specialized wound management and treatment services delivered by certified wound care professionals.',
			highlights: [
				'Professional wound assessment',
				'Advanced dressing techniques',
				'Infection prevention',
				'Healing progress monitoring'
			],
			image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop&q=80',
			link: '/services/wound-care',
			color: 'emerald'
		},
		{
			icon: Home,
			name: 'Home Care Services',
			description: 'Comprehensive nursing and healthcare services provided in the comfort of your home.',
			highlights: [
				'Post-operative care',
				'Elderly care support',
				'Chronic disease management',
				'Maternal & child care'
			],
			image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80',
			link: '/services/home-care',
			color: 'blue'
		},
		{
			icon: ShoppingBag,
			name: 'Medical Supplies',
			description: 'Quality medical equipment and supplies for home healthcare, rehabilitation, and personal care.',
			highlights: [
				'Mobility aids & equipment',
				'Respiratory devices',
				'Diagnostic tools',
				'First aid supplies'
			],
			image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop&q=80',
			link: '/medical-supplies',
			color: 'purple'
		},
		{
			icon: Stethoscope,
			name: 'Doctor Consultations',
			description: 'Professional medical consultations with experienced doctors for health advice and guidance.',
			highlights: [
				'Expert medical advice',
				'Health condition assessment',
				'Treatment recommendations',
				'Follow-up care planning'
			],
			image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&q=80',
			link: '/consultations',
			color: 'teal'
		},
		{
			icon: GraduationCap,
			name: 'Nurse Training Programs',
			description: 'Practical skills training and professional development for nursing students and practicing nurses.',
			highlights: [
				'Hands-on clinical skills',
				'Specialized techniques',
				'Flexible scheduling',
				'Expert instruction'
			],
			image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop&q=80',
			link: '/classes',
			color: 'orange'
		}
	];
</script>

<svelte:head>
	<title>Our Services - SESI Healthcare</title>
	<meta name="description" content="Comprehensive home healthcare services including nursing care, injections, post-operative care, and more." />
</svelte:head>

<Hero
	title="Comprehensive Healthcare <br/>Solutions"
	subtitle="From nursing care to medical supplies and professional training - everything you need for quality healthcare."
	badge="Our Services"
	variant="gradient"
	decorative={true}
/>

<!-- Service Categories Grid -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Explore Our Services</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Choose the category that best fits your healthcare needs. Each service is delivered by our experienced team with the highest standards of care.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
			{#each serviceCategories as category}
				<a
					href={category.link}
					class="group rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-{category.color}-200"
				>
					<!-- Category Image -->
					<div class="relative h-64 overflow-hidden">
						<img
							src={category.image}
							alt="{category.name}"
							loading="lazy"
							decoding="async"
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
						<div class="absolute bottom-4 left-4 inline-flex items-center justify-center rounded-xl bg-{category.color}-600 p-3" aria-hidden="true">
							<svelte:component this={category.icon} class="h-6 w-6 text-white" />
						</div>
					</div>

					<!-- Category Content -->
					<div class="p-8">
						<div class="flex items-start justify-between mb-4">
							<h3 class="text-2xl font-bold text-gray-900 group-hover:text-{category.color}-600 transition-colors">{category.name}</h3>
							<svg class="h-6 w-6 text-gray-400 group-hover:text-{category.color}-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</div>
						<p class="mb-6 text-gray-600 leading-relaxed">{category.description}</p>
						<div class="space-y-3">
							<p class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Highlights:</p>
							<ul class="space-y-2">
								{#each category.highlights as highlight}
									<li class="flex items-start text-sm text-gray-600">
										<svg class="mr-2 h-5 w-5 shrink-0 text-{category.color}-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
										</svg>
										{highlight}
									</li>
								{/each}
							</ul>
						</div>
						<div class="mt-6">
							<span class="inline-flex items-center text-sm font-semibold text-{category.color}-600 group-hover:underline">
								Learn More
								<svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</div>
					</div>
				</a>
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
					<h3 class="mb-2 text-xl font-bold text-gray-900">Choose Your Service</h3>
					<p class="text-gray-600 leading-relaxed">
						Select the service category that fits your needs - from care services to medical supplies or training.
					</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					2
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">Connect With Us</h3>
					<p class="text-gray-600 leading-relaxed">
						Book online, request a quote, or inquire about training programs. Our team will respond promptly.
					</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					3
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">Get What You Need</h3>
					<p class="text-gray-600 leading-relaxed">
						Receive professional care, quality medical supplies, or expert training - all delivered with excellence.
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
				Ready to Get Started?
			</h2>
			<p class="text-xl text-emerald-50 mb-10 leading-relaxed">
				Whether you need healthcare services, medical supplies, or professional training - we're here to help.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/booking"
					class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
				>
					Book a Service
					<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="/contact"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300"
				>
					Contact Us
				</a>
			</div>
		</div>
	</div>
</section>
