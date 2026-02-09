<script lang="ts">
	import { Stethoscope, Video, Clock, CheckCircle2 } from '@lucide/svelte';
	import { Hero } from '$lib';

	const consultationServices = [
		{
			icon: Stethoscope,
			name: 'General Health Consultation',
			description: 'Discuss general health concerns, symptoms, and wellness with our experienced doctors.',
			duration: '30-45 minutes',
			features: [
				'Health assessment and advice',
				'Symptom evaluation',
				'Medication review',
				'Lifestyle recommendations'
			]
		},
		{
			icon: Video,
			name: 'Follow-up Consultation',
			description: 'Check on your recovery progress and adjust treatment plans as needed.',
			duration: '20-30 minutes',
			features: [
				'Progress monitoring',
				'Treatment effectiveness review',
				'Care plan adjustments',
				'Questions and concerns'
			]
		},
		{
			icon: Stethoscope,
			name: 'Specialist Consultation',
			description: 'Expert advice on specific medical conditions or treatment options.',
			duration: '45-60 minutes',
			features: [
				'Specialized medical advice',
				'Second opinion services',
				'Treatment planning',
				'Referral guidance'
			]
		}
	];

	const doctors = [
		{
			name: 'Dr Salifu Nyagse',
			specialty: 'Orthopedics Surgery',
			experience: '8+ years',
			credentials: 'MD, Orthopedics',
			image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=600&fit=crop&q=80'
		}
	];

	const benefits = [
		{
			icon: Clock,
			title: 'Flexible Scheduling',
			description: 'Book consultations at times that work for your schedule.'
		},
		{
			icon: CheckCircle2,
			title: 'Expert Medical Advice',
			description: 'Get professional guidance from experienced, licensed doctors.'
		},
		{
			icon: Stethoscope,
			title: 'Personalized Care',
			description: 'Receive tailored health advice specific to your needs and conditions.'
		}
	];
</script>

<svelte:head>
	<title>Doctor Consultations - SESI Healthcare</title>
	<meta name="description" content="Book professional medical consultations with experienced doctors for health advice and guidance." />
</svelte:head>

<Hero
	title="Professional Doctor <br/>Consultations"
	subtitle="Get expert medical advice from experienced doctors. Book a consultation for health guidance and treatment recommendations."
	badge="Consultations"
	variant="gradient"
	decorative={true}
/>

<!-- Consultation Services -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Consultation Services</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Professional medical consultations tailored to your healthcare needs
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
			{#each consultationServices as service}
				<div class="rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100">
					<div class="inline-flex items-center justify-center rounded-xl bg-emerald-100 p-4 mb-6">
						<svelte:component this={service.icon} class="h-7 w-7 text-emerald-600" />
					</div>
					<h3 class="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
					<p class="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
					<div class="flex items-center gap-2 mb-6 text-sm text-emerald-600 font-semibold">
						<Clock class="h-4 w-4" />
						<span>{service.duration}</span>
					</div>
					<div class="space-y-2">
						<p class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Includes:</p>
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

<!-- Our Doctors -->
<section class="py-24 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Our Medical Consultants</h2>
			<p class="text-xl text-gray-600">
				Experienced doctors ready to provide expert medical guidance
			</p>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
			{#each doctors as doctor}
				<div class="rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
					<!-- Doctor Image -->
					<div class="h-80 overflow-hidden bg-gray-100">
						<img
							src={doctor.image}
							alt="Dr {doctor.name}"
							loading="lazy"
							decoding="async"
							class="w-full h-full object-cover"
						/>
					</div>

					<!-- Doctor Info -->
					<div class="p-6">
						<h3 class="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
						<p class="text-emerald-600 font-semibold mb-1">{doctor.specialty}</p>
						<p class="text-sm text-gray-600 mb-1">{doctor.credentials}</p>
						<p class="text-sm text-gray-500">{doctor.experience}</p>
					</div>
				</div>
			{/each}
			<!-- Placeholder for more doctors -->
			<div class="rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 p-12 flex flex-col items-center justify-center text-center">
				<Stethoscope class="h-12 w-12 text-gray-400 mb-4" />
				<p class="text-gray-600 font-semibold mb-2">More Doctors Available</p>
				<p class="text-sm text-gray-500">Additional medical specialists on standby</p>
			</div>
		</div>
	</div>
</section>

<!-- Benefits -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Consultations</h2>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-3 max-w-5xl mx-auto">
			{#each benefits as benefit}
				<div class="flex gap-4 items-start">
					<div class="shrink-0 rounded-2xl bg-emerald-100 p-4 text-emerald-600">
						<svelte:component this={benefit.icon} class="h-7 w-7" />
					</div>
					<div>
						<h3 class="mb-2 text-xl font-bold text-gray-900">{benefit.title}</h3>
						<p class="text-gray-600 leading-relaxed">{benefit.description}</p>
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
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					1
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">Book Your Consultation</h3>
					<p class="text-gray-600 leading-relaxed">
						Schedule a consultation at a time that works for you through our booking system.
					</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					2
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">Prepare Your Questions</h3>
					<p class="text-gray-600 leading-relaxed">
						Gather your medical history, current medications, and questions for the doctor.
					</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					3
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">Get Expert Advice</h3>
					<p class="text-gray-600 leading-relaxed">
						Meet with the doctor at the scheduled time for your personalized consultation.
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
				Ready to Book a Consultation?
			</h2>
			<p class="text-xl text-emerald-50 mb-10 leading-relaxed">
				Schedule your consultation with our experienced doctors today and get the medical guidance you need.
			</p>
			<a
				href="/booking"
				class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
			>
				Book a Consultation
				<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</div>
</section>
