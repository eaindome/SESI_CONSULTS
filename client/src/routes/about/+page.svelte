<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Target, Eye, Award, Heart, Shield } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const values = [
		{
			icon: Heart,
			title: 'Compassion',
			description: 'We treat every patient with the kindness and respect they deserve, as we would our own family.'
		},
		{
			icon: Award,
			title: 'Excellence',
			description: 'We maintain the highest standards of professional healthcare delivery in every service we provide.'
		},
		{
			icon: Shield,
			title: 'Trust',
			description: 'We build lasting relationships through reliability, transparency, and consistent quality care.'
		}
	];

	const team = [
		{
			name: 'Dr. Salifu Nyagse',
			role: 'Medical Doctor',
			credentials: 'MD, PhD',
			experience: '12+ years experience',
			specialties: ['General Medicine', 'Chronic Disease Management', 'Post-Operative Care'],
			description: 'A highly experienced physician dedicated to delivering evidence-based, patient-centered care in the home setting. Dr. Nyagse brings academic rigor and clinical depth to every patient he serves.',
			image: '/images/profiles/dr.salifu.webp'
		},
		{
			name: 'Dr. Vera Turkson',
			role: 'Medical Doctor',
			credentials: 'MD',
			experience: '8+ years experience',
			specialties: ['Maternal Care', 'Newborn Care', 'Elderly Care'],
			description: 'A compassionate physician with a special focus on maternal and child health. Dr. Turkson brings warmth and clinical excellence to every home visit, ensuring both mother and child receive the highest standard of care.',
			image: '/images/profiles/dr.vera.webp'
		},
		{
			name: 'Ebenezer Takyi',
			role: 'Registered Nurse',
			credentials: 'RN, Certified Wound Care Specialist',
			experience: '10+ years experience',
			specialties: ['Wound Care', 'Post-Surgical Care', 'IV Therapy'],
			description: 'An expert in wound management and post-surgical recovery, Ebenezer combines technical skill with genuine compassion. His dedication to promoting healing and patient comfort makes him an invaluable part of our team.',
			image: '/images/profiles/ebenezer.takyi.webp'
		},
		{
			name: 'Nurse Mohammed',
			role: 'Registered Nurse',
			credentials: 'RN, Diabetes Educator',
			experience: '7+ years experience',
			specialties: ['Diabetes Management', 'Health Education', 'Medication Management'],
			description: 'Skilled in chronic disease management and patient education, helping patients achieve better health outcomes.',
			image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=600&fit=crop&q=80'
		}
	];

	// Animation state
	let isHeroVisible = $state(false);
	let teamCardElements: HTMLElement[] = [];
	let isTeamCardVisible = $state(Array(team.length).fill(false));

	onMount(() => {
		setTimeout(() => isHeroVisible = true, 100);

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const index = teamCardElements.indexOf(entry.target as HTMLElement);
					if (index !== -1) {
						setTimeout(() => {
							isTeamCardVisible[index] = true;
						}, index * 150);
					}
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });

		teamCardElements.forEach(el => observer.observe(el));

		return () => {
			teamCardElements.forEach(el => observer.unobserve(el));
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>About Us - SES Homecare & Medical Supplies</title>
	<meta name="description" content="Learn about SES Homecare & Medical Supplies's mission to provide quality home healthcare services with compassion and excellence." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-linear-to-br from-[#1a5f4a] to-[#0d3d2d] py-24 sm:py-32">
	<!-- SVG Pattern Overlay -->
	<div class="absolute inset-0 opacity-5 pointer-events-none">
		<svg width="100%" height="100%">
			<pattern id="about-dots" width="20" height="20" patternUnits="userSpaceOnUse">
				<circle cx="3" cy="3" r="1.5" fill="currentColor" class="text-white" />
			</pattern>
			<rect width="100%" height="100%" fill="url(#about-dots)" />
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
					Our Story
				</div>
				<h1 in:fly={{ y: 30, duration: 700, delay: 200 }} class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
					Compassionate Care, Exceptional Service
				</h1>
				<p in:fly={{ y: 20, duration: 600, delay: 400 }} class="text-xl text-white/90 leading-relaxed">
					Dedicated to bringing professional healthcare to the comfort of your home
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

<!-- Story Section -->
<section class="py-16 md:py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-6xl">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
				<div>
					<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
					<div class="space-y-6 text-lg text-gray-600 leading-relaxed">
						<p>
							SES Homecare & Medical Supplies was founded with a simple yet powerful mission: to provide professional,
							compassionate healthcare services in the comfort and safety of patients' homes.
						</p>
						<p>
							We understand that receiving care at home can make a significant difference in recovery
							and overall well-being. Our team of experienced healthcare professionals is dedicated
							to delivering personalized care that meets the unique needs of each patient and their family.
						</p>
						<p>
							From routine health monitoring to specialized nursing care, we are committed to ensuring
							that you or your loved ones receive the highest quality healthcare without the stress
							of traveling to a medical facility.
						</p>
					</div>
				</div>
				<div class="rounded-2xl overflow-hidden shadow-lg">
					<img
						src="/images/about-story.webp"
						alt="Healthcare professional caring for patient"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Mission & Vision -->
<section class="py-16 md:py-24 bg-linear-to-br from-[#1a5f4a] to-[#0d3d2d]">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
			<!-- Mission -->
			<div class="flex flex-col gap-6 py-10 lg:py-0 lg:pr-16">
				<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-white">
					<Target class="h-7 w-7" />
				</div>
				<div class="w-12 h-1 rounded-full bg-[#4caf50]"></div>
				<h2 class="text-3xl font-bold text-white">Our Mission</h2>
				<p class="text-lg text-white/80 leading-relaxed">
					To deliver exceptional home healthcare services that empower patients to maintain their
					independence and quality of life while receiving professional medical care in a familiar,
					comfortable environment.
				</p>
			</div>
			<!-- Vision -->
			<div class="flex flex-col gap-6 py-10 lg:py-0 lg:pl-16">
				<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-white">
					<Eye class="h-7 w-7" />
				</div>
				<div class="w-12 h-1 rounded-full bg-[#f4b400]"></div>
				<h2 class="text-3xl font-bold text-white">Our Vision</h2>
				<p class="text-lg text-white/80 leading-relaxed">
					To be the most trusted name in home healthcare, known for our commitment to excellence,
					compassion, and innovation in delivering patient-centered care that makes a real
					difference in people's lives.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Our Values -->
<section class="py-16 md:py-24 bg-[#f0f7f5]">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-6xl">
			<div class="text-center mb-16">
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
				<p class="text-xl text-gray-600 max-w-2xl mx-auto">
					The principles that guide everything we do
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each values as value (value.title)}
					<div class="group flex flex-col items-center text-center bg-white rounded-2xl p-8 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
						<div class="mb-5 rounded-2xl bg-[#1a5f4a]/10 p-5 text-[#1a5f4a] transition-all duration-300 group-hover:bg-[#1a5f4a] group-hover:text-white group-hover:scale-110">
							<value.icon class="h-8 w-8" />
						</div>
						<h3 class="mb-3 text-xl font-bold text-gray-900">{value.title}</h3>
						<p class="text-gray-600 leading-relaxed">{value.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Meet Our Team -->
<section id="team" class="py-16 md:py-24 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<div class="inline-block px-4 py-1.5 bg-[#1a5f4a]/10 text-[#1a5f4a] text-sm font-semibold rounded-full mb-4">
				Our People
			</div>
			<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Professionals Behind Your Care</h2>
			<p class="text-xl text-gray-600 max-w-2xl mx-auto">
				Experienced, licensed professionals dedicated to your health and well-being
			</p>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-2 max-w-6xl mx-auto">
			{#each team as member, i (member.name ?? i)}
				<div
					bind:this={teamCardElements[i]}
					class="h-full transition-all duration-700 {isTeamCardVisible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
				>
					<Card hoverable padding="none" class="group overflow-hidden h-full flex flex-col">
						<!-- Team Member Image -->
						{#if member.image}
							<div class="h-80 overflow-hidden bg-gray-100">
								<img
									src={member.image}
									alt={member.name}
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
							</div>
						{:else}
							<div class="h-80 bg-[#1a5f4a] flex items-center justify-center">
								<span class="text-8xl font-bold text-white">{member.name.split(' ')[1][0]}</span>
							</div>
						{/if}

						<!-- Team Member Info -->
					<div class="p-8 flex flex-col flex-1">
							<div class="mb-6">
								<h3 class="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
								<p class="text-[#1a5f4a] font-semibold mb-1">{member.role}</p>
								<p class="text-sm text-gray-600 mb-1">{member.credentials}</p>
								<p class="text-sm text-gray-500">{member.experience}</p>
							</div>

							<p class="text-gray-600 mb-6 leading-relaxed">{member.description}</p>

							<div>
								<p class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Specialties</p>
								<div class="flex flex-wrap gap-2">
									{#each member.specialties as specialty (specialty)}
										<Badge status="safe" size="md">{specialty}</Badge>
									{/each}
								</div>
							</div>
						</div>
					</Card>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Our Standards -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-4xl">
			<div class="text-center mb-12">
				<h2 class="text-4xl font-bold text-gray-900 mb-4">Our Standards</h2>
				<p class="text-xl text-gray-600">
					Every member of our team meets rigorous professional standards to ensure you receive
					the highest quality care.
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="flex gap-4 items-start bg-gray-50 rounded-2xl p-6">
					<div class="shrink-0 rounded-xl bg-[#1a5f4a]/10 p-3 text-[#1a5f4a]">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<h3 class="font-bold text-gray-900 mb-2">Licensed & Certified</h3>
						<p class="text-sm text-gray-600 leading-relaxed">
							All nurses are registered and hold current licenses with relevant certifications.
						</p>
					</div>
				</div>

				<div class="flex gap-4 items-start bg-gray-50 rounded-2xl p-6">
					<div class="shrink-0 rounded-xl bg-[#1a5f4a]/10 p-3 text-[#1a5f4a]">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
						</svg>
					</div>
					<div>
						<h3 class="font-bold text-gray-900 mb-2">Background Checked</h3>
						<p class="text-sm text-gray-600 leading-relaxed">
							Comprehensive background checks and verification of all credentials.
						</p>
					</div>
				</div>

				<div class="flex gap-4 items-start bg-gray-50 rounded-2xl p-6">
					<div class="shrink-0 rounded-xl bg-[#1a5f4a]/10 p-3 text-[#1a5f4a]">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
					</div>
					<div>
						<h3 class="font-bold text-gray-900 mb-2">Ongoing Training</h3>
						<p class="text-sm text-gray-600 leading-relaxed">
							Regular continuing education to stay current with best practices and protocols.
						</p>
					</div>
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
				Experience Our Commitment to Care
			</h2>
			<p class="text-xl text-white/90 mb-10 leading-relaxed">
				Join the families who trust SES Homecare & Medical Supplies for their home healthcare needs.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="inverse" size="lg" href="/booking" elevation>
					Book an Appointment
				</Button>
				<Button variant="inverse-outline" size="lg" href="/services">
					Our Services
				</Button>
			</div>
		</div>
	</div>
</section>
