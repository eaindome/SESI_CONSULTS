<script lang="ts">
	import { Heart, Clock, Shield, Users, ArrowRight, Sparkles, Award, HeartPulse, Calendar, Phone } from '@lucide/svelte';
	import { Hero, Button } from '$lib';

	const features = [
		{
			icon: Heart,
			title: 'Compassionate Care',
			description: 'Professional nurses who treat you like family, providing personalized attention in the comfort of your home.',
			color: 'from-pink-500 to-rose-500'
		},
		{
			icon: Clock,
			title: 'Flexible Scheduling',
			description: 'Book appointments that fit your schedule. Available 24/7 for urgent care needs.',
			color: 'from-blue-500 to-cyan-500'
		},
		{
			icon: Shield,
			title: 'Licensed & Insured',
			description: 'All our healthcare professionals are fully licensed, certified, and background-checked for your safety.',
			color: 'from-emerald-500 to-teal-500'
		},
		{
			icon: Users,
			title: 'Family-Centered',
			description: 'We involve your loved ones in the care process, ensuring everyone feels supported and informed.',
			color: 'from-violet-500 to-purple-500'
		}
	];

	const stats = [
		{ value: '500+', label: 'Patients Served', icon: HeartPulse },
		{ value: '50+', label: 'Healthcare Professionals', icon: Users },
		{ value: '24/7', label: 'Support Available', icon: Clock },
		{ value: '100%', label: 'Satisfaction Rate', icon: Award }
	];
</script>

<svelte:head>
	<title>SESI Healthcare - Home Nursing Services</title>
	<meta name="description" content="Professional home healthcare services delivered with compassion. Book trusted nurses for in-home care." />
</svelte:head>

<Hero
	title="Quality Healthcare in the <span class='text-emerald-400'>Comfort of Your Home</span>"
	subtitle="Professional home nursing and healthcare services delivered with compassion and excellence. Your health and comfort are our priority."
	variant="image"
	imageUrl="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&h=1080&fit=crop&q=80"
	decorative={false}
>
	<div class="flex flex-col sm:flex-row gap-4 justify-center">
		<a href="/booking">
			<Button variant="primary" size="lg" class="shadow-2xl shadow-emerald-900/50 hover:shadow-emerald-900/70">
				{#snippet children()}
					<Sparkles class="h-5 w-5" />
					Book an Appointment
				{/snippet}
				{#snippet icon()}
					<ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
				{/snippet}
			</Button>
		</a>
		<a href="/services">
			<Button variant="ghost" size="lg">
				{#snippet children()}
					View Services
				{/snippet}
			</Button>
		</a>
	</div>
</Hero>

<!-- Stats Section - NEW -->
<section class="relative py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 overflow-hidden">
	<!-- Animated background -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
	</div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			{#each stats as stat}
				<div class="text-center group">
					<div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
						<svelte:component this={stat.icon} class="h-8 w-8 text-white" />
					</div>
					<div class="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
					<div class="text-emerald-50 font-medium">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Features Section - Enhanced -->
<section class="relative py-32 bg-white overflow-hidden">
	<!-- Decorative background elements -->
	<div class="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-3xl opacity-20"></div>
	<div class="absolute bottom-20 left-0 w-[500px] h-[500px] bg-teal-100 rounded-full blur-3xl opacity-20"></div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="text-center mb-20">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm mb-6">
				<Sparkles class="h-4 w-4" />
				Why Choose Us
			</div>
			<h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
				Healthcare That
				<span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Puts You First</span>
			</h2>
			<p class="text-xl text-gray-600 max-w-2xl mx-auto">
				Experience exceptional care with a personal touch, right in the comfort of your own home
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
			{#each features as feature, index}
				<div class="group relative">
					<!-- Animated gradient background -->
					<div class="absolute -inset-0.5 bg-gradient-to-r {feature.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>

					<div class="relative bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
						<div class="flex gap-6">
							<!-- Icon with gradient -->
							<div class="shrink-0">
								<div class="relative">
									<div class="absolute inset-0 bg-gradient-to-br {feature.color} rounded-2xl blur-md opacity-50"></div>
									<div class="relative bg-gradient-to-br {feature.color} rounded-2xl p-5 text-white group-hover:scale-110 transition-transform duration-300 shadow-xl">
										<svelte:component this={feature.icon} class="h-8 w-8" />
									</div>
								</div>
							</div>

							<div class="flex-1">
								<h3 class="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
								<p class="text-gray-600 leading-relaxed">{feature.description}</p>
							</div>
						</div>

						<!-- Decorative corner accent -->
						<div class="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br {feature.color} rounded-full blur-2xl opacity-10"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Testimonial Section - NEW -->
<section class="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
	<div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-16">
				<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm mb-6">
					<Heart class="h-4 w-4" />
					Trusted by Families
				</div>
				<h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
			</div>

			<div class="relative bg-white rounded-3xl shadow-2xl p-10 md:p-12 border border-gray-100">
				<!-- Quote mark decoration -->
				<div class="absolute top-8 left-8 text-8xl text-emerald-100 font-serif leading-none">"</div>

				<div class="relative">
					<p class="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
						The care and attention we received from SESI Healthcare was exceptional. The nurses were professional, compassionate, and made my mother feel comfortable throughout her recovery. I highly recommend their services.
					</p>

					<div class="flex items-center gap-4">
						<div class="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-bold text-xl">
							A.M
						</div>
						<div>
							<div class="font-bold text-gray-900">Akosua Mensah</div>
							<div class="text-gray-600">Patient Family Member</div>
						</div>
					</div>

					<!-- 5-star rating -->
					<div class="flex gap-1 mt-6">
						{#each Array(5) as _}
							<svg class="h-6 w-6 text-amber-400 fill-current" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section - Enhanced -->
<section class="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 py-32 overflow-hidden">
	<!-- Animated decorative background -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
	</div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="mx-auto max-w-4xl">
			<div class="text-center mb-12">
				<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-sm mb-8">
					<Sparkles class="h-4 w-4" />
					Get Started Today
				</div>
				<h2 class="text-5xl md:text-6xl font-bold text-white mb-6">
					Ready to Experience
					<br />
					Quality Care at Home?
				</h2>
				<p class="text-xl md:text-2xl text-emerald-50 mb-12 leading-relaxed max-w-2xl mx-auto">
					Book your appointment today and let our professional team provide the compassionate care you deserve.
				</p>

				<div class="flex flex-col sm:flex-row gap-5 justify-center">
					<a href="/booking">
						<Button variant="secondary" size="lg" class="shadow-2xl hover:scale-105 transition-transform">
							{#snippet children()}
								<Calendar class="h-5 w-5" />
								Book an Appointment
							{/snippet}
							{#snippet icon()}
								<ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
							{/snippet}
						</Button>
					</a>
					<a href="/contact">
						<Button variant="ghost" size="lg" class="hover:bg-white/20">
							{#snippet children()}
								<Phone class="h-5 w-5" />
								Contact Us
							{/snippet}
						</Button>
					</a>
				</div>
			</div>

			<!-- Trust badges -->
			<div class="flex flex-wrap justify-center items-center gap-8 pt-12 border-t border-white/20">
				<div class="flex items-center gap-3 text-white">
					<div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
						<Shield class="h-6 w-6" />
					</div>
					<div class="text-left">
						<div class="font-bold">Licensed</div>
						<div class="text-emerald-100 text-sm">Certified Professionals</div>
					</div>
				</div>

				<div class="flex items-center gap-3 text-white">
					<div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
						<HeartPulse class="h-6 w-6" />
					</div>
					<div class="text-left">
						<div class="font-bold">Trusted</div>
						<div class="text-emerald-100 text-sm">By 500+ Patients</div>
					</div>
				</div>

				<div class="flex items-center gap-3 text-white">
					<div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
						<Award class="h-6 w-6" />
					</div>
					<div class="text-left">
						<div class="font-bold">Top Rated</div>
						<div class="text-emerald-100 text-sm">5-Star Reviews</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
