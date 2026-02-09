<script lang="ts">
	import { Heart, Stethoscope, GraduationCap, Package, Home as HomeIcon, ArrowRight, CheckCircle, Sparkles } from '@lucide/svelte';
	import { Hero, Button } from '$lib';

	const services = [
		{
			id: 'wound-care',
			icon: Heart,
			title: 'Wound Care',
			description: 'Expert care for acute wounds, chronic wounds, burns, and post-surgical wound management with professional dressing and monitoring.',
			features: ['Acute Wound Treatment', 'Chronic Wound Management', 'Burn Care', 'Post-Surgical Wounds'],
			color: 'from-rose-500 to-pink-500',
			href: '/services/wound-care'
		},
		{
			id: 'home-care',
			icon: HomeIcon,
			title: 'Home Care Services',
			description: 'Comprehensive home nursing services including general care, injections, post-operative care, and chronic disease management in your home.',
			features: ['General Nursing', 'Injection Services', 'Post-Operative Care', 'Chronic Disease Management', 'Elderly Care', 'Maternal & Child Care'],
			color: 'from-blue-500 to-cyan-500',
			href: '/services/home-care'
		},
		{
			id: 'consultations',
			icon: Stethoscope,
			title: 'Doctor Consultations',
			description: 'Professional medical consultations with experienced doctors for general health assessments, follow-ups, and specialist care.',
			features: ['General Health Consultations', 'Follow-up Appointments', 'Specialist Consultations (Orthopedics)'],
			color: 'from-emerald-500 to-teal-500',
			href: '/services/consultations'
		},
		{
			id: 'training',
			icon: GraduationCap,
			title: 'Nurse Training Programs',
			description: 'Professional training programs for nurses and healthcare workers covering essential skills and specialized techniques.',
			features: ['Wound Care & Dressing', 'Catheterization & IV Therapy', 'Emergency & Trauma Care', 'Patient Mobility', 'Medical Equipment Operation'],
			color: 'from-violet-500 to-purple-500',
			href: '/services/training'
		},
		{
			id: 'medical-supplies',
			icon: Package,
			title: 'Medical Supplies',
			description: 'Wide range of medical equipment and supplies including mobility aids, wound care products, diagnostic tools, and more.',
			features: ['Mobility Aids', 'Wound Care Products', 'Diagnostic Equipment', 'Personal Care Items', 'Medical Devices'],
			color: 'from-amber-500 to-orange-500',
			href: '/services/medical-supplies'
		}
	];
</script>

<svelte:head>
	<title>Our Services - SESI Healthcare</title>
	<meta name="description" content="Explore our comprehensive healthcare services including wound care, home nursing, consultations, training programs, and medical supplies." />
</svelte:head>

<Hero
	title="Our Healthcare <br/><span class='text-emerald-400'>Services</span>"
	subtitle="Comprehensive healthcare solutions tailored to your needs"
	badge="What We Offer"
	variant="gradient"
	decorative={true}
/>

<!-- Services Grid -->
<section class="relative py-28 overflow-hidden">
	<!-- Premium gradient background -->
	<div class="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-emerald-50/20"></div>

	<!-- Decorative elements -->
	<div class="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-3xl opacity-20"></div>
	<div class="absolute bottom-20 left-0 w-[500px] h-[500px] bg-teal-100 rounded-full blur-3xl opacity-20"></div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="max-w-7xl mx-auto">
			<!-- Intro Text -->
			<div class="text-center mb-20">
				<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm mb-6">
					<Sparkles class="h-4 w-4" />
					Comprehensive Care
				</div>
				<h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
					Professional Healthcare
					<span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> At Your Doorstep</span>
				</h2>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto">
					From wound care to medical supplies, we provide comprehensive healthcare services with compassion and excellence
				</p>
			</div>

			<!-- Services Grid -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
				{#each services as service}
					<div class="group relative">
						<!-- Animated gradient glow -->
						<div class="absolute -inset-0.5 bg-gradient-to-r {service.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>

						<div class="relative bg-white rounded-3xl p-8 md:p-10 border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
							<!-- Icon and Title -->
							<div class="flex items-start gap-6 mb-6">
								<div class="shrink-0">
									<div class="relative">
										<div class="absolute inset-0 bg-gradient-to-br {service.color} rounded-2xl blur-md opacity-50"></div>
										<div class="relative bg-gradient-to-br {service.color} rounded-2xl p-5 text-white group-hover:scale-110 transition-transform duration-300 shadow-xl">
											<svelte:component this={service.icon} class="h-8 w-8" />
										</div>
									</div>
								</div>

								<div class="flex-1">
									<h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{service.title}</h3>
									<p class="text-gray-600 leading-relaxed">{service.description}</p>
								</div>
							</div>

							<!-- Features List -->
							<div class="space-y-3 mb-8 flex-1">
								{#each service.features as feature}
									<div class="flex items-center gap-3 text-gray-700">
										<CheckCircle class="h-5 w-5 text-emerald-600 shrink-0" />
										<span class="text-sm font-medium">{feature}</span>
									</div>
								{/each}
							</div>

							<!-- CTA Button -->
							<a href={service.href}>
								<Button variant="primary" size="md" class="w-full group/btn">
									{#snippet children()}
										View Details & Book
									{/snippet}
									{#snippet icon()}
										<ArrowRight class="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
									{/snippet}
								</Button>
							</a>

							<!-- Decorative corner accent -->
							<div class="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br {service.color} rounded-full blur-2xl opacity-10"></div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Why Choose Us Section -->
			<div class="relative bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
				<!-- Decorative elements -->
				<div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 animate-pulse"></div>
				<div class="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 animate-pulse" style="animation-delay: 1s;"></div>

				<div class="relative z-10">
					<div class="text-center mb-12">
						<h3 class="text-3xl md:text-4xl font-bold mb-4">Why Choose SESI Healthcare?</h3>
						<p class="text-emerald-50 text-lg">We're committed to providing exceptional healthcare services</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div class="text-center">
							<div class="text-5xl font-bold mb-2">500+</div>
							<div class="text-emerald-100">Patients Served</div>
						</div>
						<div class="text-center">
							<div class="text-5xl font-bold mb-2">50+</div>
							<div class="text-emerald-100">Healthcare Professionals</div>
						</div>
						<div class="text-center">
							<div class="text-5xl font-bold mb-2">24/7</div>
							<div class="text-emerald-100">Support Available</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
