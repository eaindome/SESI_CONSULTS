<script lang="ts">
	import { Heart, Clock, Shield, Users, ArrowRight, Sparkles, CheckCircle, Home, Stethoscope, GraduationCap, Package, Phone, Mail, MapPin } from '@lucide/svelte';
	import { Hero, Button } from '$lib';

	const services = [
		{
			icon: Heart,
			title: 'Wound Care',
			description: 'Professional wound assessment, treatment, and monitoring for optimal healing.',
			href: '/services/wound-care',
			color: 'from-rose-500 to-pink-500'
		},
		{
			icon: Home,
			title: 'Home Care',
			description: 'Comprehensive nursing care delivered in the comfort of your home.',
			href: '/services/home-care',
			color: 'from-blue-500 to-cyan-500'
		},
		{
			icon: Stethoscope,
			title: 'Consultations',
			description: 'Expert medical consultations with qualified healthcare professionals.',
			href: '/services/consultations',
			color: 'from-emerald-500 to-teal-500'
		},
		{
			icon: GraduationCap,
			title: 'Training',
			description: 'Professional healthcare training programs for caregivers and professionals.',
			href: '/services/training',
			color: 'from-violet-500 to-purple-500'
		}
	];

	const values = [
		{
			icon: Heart,
			title: 'Compassionate Care',
			description: 'Every patient receives personalized attention with empathy and respect'
		},
		{
			icon: Shield,
			title: 'Safety First',
			description: 'Licensed professionals with rigorous background checks and certifications'
		},
		{
			icon: Clock,
			title: 'Always Available',
			description: 'Flexible scheduling with 24/7 support for urgent care needs'
		},
		{
			icon: Users,
			title: 'Family Centered',
			description: 'We involve your loved ones in every step of the care journey'
		}
	];

	const steps = [
		{
			number: '01',
			title: 'Choose Your Service',
			description: 'Select from our range of healthcare services tailored to your needs'
		},
		{
			number: '02',
			title: 'Book Appointment',
			description: 'Pick a convenient time and date that works for your schedule'
		},
		{
			number: '03',
			title: 'Receive Care',
			description: 'Meet our qualified healthcare professionals and get the care you deserve'
		}
	];
</script>

<svelte:head>
	<title>SESI Healthcare - Professional Home Nursing & Medical Services in Ghana</title>
	<meta name="description" content="Quality healthcare services delivered to your home. Professional nurses, wound care, consultations, and medical training in Accra, Ghana." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[90vh] flex items-center overflow-hidden">
	<!-- Background Image -->
	<div class="absolute inset-0">
		<img
			src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=1080&fit=crop&q=80"
			alt="Healthcare professional"
			class="w-full h-full object-cover"
		/>
		<!-- Dark overlay for text contrast -->
		<div class="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-teal-900/80"></div>
	</div>

	<!-- Animated teal accents -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s;"></div>
	</div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-20">
		<div class="max-w-5xl mx-auto text-center">
			<!-- Badge -->
			<div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/10 backdrop-blur-sm border border-teal-400/20 text-teal-300 font-semibold text-sm mb-8 hover:bg-teal-500/20 transition-colors">
				<Sparkles class="h-4 w-4" />
				Professional Healthcare at Your Doorstep
			</div>

			<!-- Main heading -->
			<h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
				Quality Healthcare in the
				<span class="text-teal-400">
					Comfort of Your Home
				</span>
			</h1>

			<!-- Subtitle -->
			<p class="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
				Professional nursing services, medical consultations, and healthcare training delivered with compassion and excellence across Ghana.
			</p>

			<!-- CTA Buttons -->
			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
				<a href="/services">
					<Button variant="primary" size="lg" class="bg-teal-500 hover:bg-teal-600 shadow-2xl shadow-teal-900/50 border-0">
						{#snippet children()}
							<Heart class="h-5 w-5" />
							Browse Services
						{/snippet}
						{#snippet icon()}
							<ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
						{/snippet}
					</Button>
				</a>
				<a href="/contact">
					<Button variant="outline" size="lg" class="border-teal-400/30 text-white hover:bg-teal-500/10">
						{#snippet children()}
							<Phone class="h-5 w-5" />
							Contact Us
						{/snippet}
					</Button>
				</a>
			</div>

			<!-- Trust indicators -->
			<div class="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-gray-700/50">
				<div class="flex items-center gap-3 text-gray-300">
					<div class="w-10 h-10 rounded-lg bg-teal-500/20 backdrop-blur-sm flex items-center justify-center">
						<Shield class="h-5 w-5 text-teal-400" />
					</div>
					<span class="font-medium">Licensed & Certified</span>
				</div>
				<div class="flex items-center gap-3 text-gray-300">
					<div class="w-10 h-10 rounded-lg bg-teal-500/20 backdrop-blur-sm flex items-center justify-center">
						<Clock class="h-5 w-5 text-teal-400" />
					</div>
					<span class="font-medium">24/7 Available</span>
				</div>
				<div class="flex items-center gap-3 text-gray-300">
					<div class="w-10 h-10 rounded-lg bg-teal-500/20 backdrop-blur-sm flex items-center justify-center">
						<Heart class="h-5 w-5 text-teal-400" />
					</div>
					<span class="font-medium">Patient Focused</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom wave -->
	<div class="absolute bottom-0 left-0 right-0">
		<svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
			<path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
		</svg>
	</div>
</section>

<!-- Services Grid -->
<section class="py-24 bg-white relative overflow-hidden">
	<!-- Decorative elements -->
	<div class="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl opacity-40"></div>
	<div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100 rounded-full blur-3xl opacity-40"></div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-semibold text-sm mb-6">
				<Sparkles class="h-4 w-4" />
				Our Services
			</div>
			<h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
				Comprehensive Healthcare
				<span class="text-teal-600"> Solutions</span>
			</h2>
			<p class="text-xl text-gray-600 max-w-2xl mx-auto">
				From wound care to professional training, we offer a complete range of healthcare services tailored to your needs
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
			{#each services as service}
				<a href={service.href} class="group relative">
					<!-- Gradient glow effect -->
					<div class="absolute -inset-0.5 bg-gradient-to-r {service.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></div>

					<div class="relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
						<!-- Icon -->
						<div class="mb-6">
							<div class="relative inline-block">
								<div class="absolute inset-0 bg-gradient-to-br {service.color} rounded-xl blur-md opacity-50"></div>
								<div class="relative bg-gradient-to-br {service.color} rounded-xl p-4 text-white">
									<svelte:component this={service.icon} class="h-7 w-7" />
								</div>
							</div>
						</div>

						<!-- Content -->
						<h3 class="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
						<p class="text-gray-600 leading-relaxed mb-4">{service.description}</p>

						<!-- Arrow -->
						<div class="flex items-center text-teal-600 font-semibold text-sm group-hover:text-teal-700">
							Learn More
							<ArrowRight class="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- How It Works -->
<section class="py-24 bg-gray-50 relative overflow-hidden">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-semibold text-sm mb-6">
				<CheckCircle class="h-4 w-4" />
				Simple Process
			</div>
			<h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
				How It Works
			</h2>
			<p class="text-xl text-gray-600 max-w-2xl mx-auto">
				Getting started with quality healthcare is easy. Just three simple steps.
			</p>
		</div>

		<div class="max-w-5xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each steps as step, index}
					<div class="relative">
						<!-- Connecting line -->
						{#if index < steps.length - 1}
							<div class="hidden md:block absolute top-24 left-[60%] w-[80%] h-0.5 bg-teal-300"></div>
						{/if}

						<div class="relative text-center">
							<!-- Number badge -->
							<div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-teal-500 text-white font-bold text-2xl mb-6 shadow-xl">
								{step.number}
							</div>

							<h3 class="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
							<p class="text-gray-600 leading-relaxed">{step.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Why Choose Us -->
<section class="py-24 bg-white relative overflow-hidden">
	<div class="absolute top-20 left-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-30"></div>
	<div class="absolute bottom-20 right-0 w-[600px] h-[600px] bg-teal-100 rounded-full blur-3xl opacity-30"></div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-semibold text-sm mb-6">
				<Heart class="h-4 w-4" />
				Why Choose SESI
			</div>
			<h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
				Healthcare That
				<span class="text-teal-600"> Puts You First</span>
			</h2>
			<p class="text-xl text-gray-600 max-w-2xl mx-auto">
				We're committed to providing exceptional care with a personal touch
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
			{#each values as value}
				<div class="group relative">
					<div class="absolute -inset-0.5 bg-teal-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>

					<div class="relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
						<div class="flex gap-5">
							<!-- Icon -->
							<div class="shrink-0">
								<div class="relative">
									<div class="absolute inset-0 bg-teal-500 rounded-xl blur-md opacity-30"></div>
									<div class="relative bg-teal-500 rounded-xl p-4 text-white">
										<svelte:component this={value.icon} class="h-6 w-6" />
									</div>
								</div>
							</div>

							<!-- Content -->
							<div class="flex-1">
								<h3 class="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
								<p class="text-gray-600 leading-relaxed">{value.description}</p>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="relative bg-teal-600 py-24 overflow-hidden">
	<!-- Animated background -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
	</div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="max-w-4xl mx-auto text-center">
			<div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-sm mb-8">
				<Sparkles class="h-4 w-4" />
				Ready to Get Started?
			</div>

			<h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
				Experience Quality Care
				<br />
				in the Comfort of Your Home
			</h2>

			<p class="text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
				Book your appointment today and let our team of qualified healthcare professionals provide the compassionate care you deserve.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
				<a href="/services">
					<Button variant="secondary" size="lg" class="shadow-2xl hover:scale-105 transition-transform bg-white text-teal-700 hover:bg-gray-50">
						{#snippet children()}
							<Heart class="h-5 w-5" />
							View All Services
						{/snippet}
						{#snippet icon()}
							<ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
						{/snippet}
					</Button>
				</a>
				<a href="/contact">
					<Button variant="ghost" size="lg" class="border-white/30 text-white hover:bg-white/10">
						{#snippet children()}
							<Phone class="h-5 w-5" />
							Get in Touch
						{/snippet}
					</Button>
				</a>
			</div>

			<!-- Contact info -->
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/20">
				<div class="flex flex-col items-center gap-3 text-white">
					<div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
						<Phone class="h-6 w-6" />
					</div>
					<div class="text-center">
						<div class="font-semibold mb-1">Call Us</div>
						<div class="text-white/80 text-sm">+233 XX XXX XXXX</div>
					</div>
				</div>

				<div class="flex flex-col items-center gap-3 text-white">
					<div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
						<Mail class="h-6 w-6" />
					</div>
					<div class="text-center">
						<div class="font-semibold mb-1">Email Us</div>
						<div class="text-white/80 text-sm">info@sesihealthcare.com</div>
					</div>
				</div>

				<div class="flex flex-col items-center gap-3 text-white">
					<div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
						<MapPin class="h-6 w-6" />
					</div>
					<div class="text-center">
						<div class="font-semibold mb-1">Visit Us</div>
						<div class="text-white/80 text-sm">Accra, Ghana</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

