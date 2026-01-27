<script lang="ts">
	const team = [
		{
			name: 'Sister Adebayo',
			role: 'Senior Registered Nurse',
			credentials: 'RN, BSN',
			experience: '12+ years experience',
			specialties: ['General Nursing', 'Chronic Disease Management', 'Post-Operative Care'],
			description: 'Dedicated healthcare professional with extensive experience in home healthcare and patient-centered care.',
			image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&q=80'
		},
		{
			name: 'Nurse Chukwu',
			role: 'Registered Nurse',
			credentials: 'RN',
			experience: '8+ years experience',
			specialties: ['Maternal Care', 'Newborn Care', 'Elderly Care'],
			description: 'Compassionate nurse specializing in maternal and child health with a gentle approach to care.',
			image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&q=80'
		},
		{
			name: 'Sister Okafor',
			role: 'Registered Nurse',
			credentials: 'RN, Certified Wound Care Specialist',
			experience: '10+ years experience',
			specialties: ['Wound Care', 'Post-Surgical Care', 'IV Therapy'],
			description: 'Expert in wound management and post-surgical care with a focus on promoting healing and comfort.',
			image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&h=600&fit=crop&q=80'
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
</script>

<svelte:head>
	<title>Meet Our Team - SESI Healthcare</title>
	<meta name="description" content="Meet our team of experienced, licensed healthcare professionals dedicated to providing quality home care." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 py-24 sm:py-32">
	<!-- Decorative circles - varied sizes and positions -->
	<div class="absolute top-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
	<div class="absolute top-40 right-40 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl"></div>
	<div class="absolute bottom-10 left-20 w-80 h-80 bg-white/8 rounded-full blur-3xl"></div>
	<div class="absolute bottom-32 left-40 w-56 h-56 bg-emerald-300/10 rounded-full blur-3xl"></div>
	<div class="absolute top-1/2 left-10 w-72 h-72 bg-teal-300/8 rounded-full blur-3xl"></div>
	<div class="absolute top-1/3 right-1/2 w-48 h-48 bg-white/12 rounded-full blur-3xl"></div>

	<!-- Small accent dots -->
	<div class="absolute top-1/4 right-1/4 w-3 h-3 bg-white/40 rounded-full"></div>
	<div class="absolute bottom-1/3 left-1/3 w-2 h-2 bg-emerald-300/50 rounded-full"></div>
	<div class="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-white/30 rounded-full"></div>
	<div class="absolute top-1/2 left-1/4 w-2 h-2 bg-teal-200/40 rounded-full"></div>

	<div class="relative container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<div class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 animate-fade-in">
				Our Team
			</div>
			<h1 class="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6 animate-fade-in-up">
				Meet the Professionals <br/>Behind Your Care
			</h1>
			<p class="text-xl text-emerald-50 leading-relaxed animate-fade-in" style="animation-delay: 0.2s;">
				Experienced, licensed professionals dedicated to your health and well-being
			</p>
		</div>
	</div>

	<!-- Bottom wave separator -->
	<div class="absolute bottom-0 left-0 right-0">
		<svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
			<path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 21.3C1200 21 1320 27 1380 29.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="white"/>
		</svg>
	</div>
</section>

<!-- Team Grid -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="grid grid-cols-1 gap-10 md:grid-cols-2 max-w-6xl mx-auto">
			{#each team as member}
				<div class="rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
					<!-- Team Member Image -->
					{#if member.image}
						<div class="h-80 overflow-hidden bg-gray-100">
							<img
								src={member.image}
								alt={member.name}
								class="w-full h-full object-cover"
							/>
						</div>
					{:else}
						<div class="h-80 bg-emerald-600 flex items-center justify-center">
							<span class="text-8xl font-bold text-white">{member.name.split(' ')[1][0]}</span>
						</div>
					{/if}

					<!-- Team Member Info -->
					<div class="p-8">
						<div class="mb-6">
							<h3 class="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
							<p class="text-emerald-600 font-semibold mb-1">{member.role}</p>
							<p class="text-sm text-gray-600 mb-1">{member.credentials}</p>
							<p class="text-sm text-gray-500">{member.experience}</p>
						</div>

						<p class="text-gray-600 mb-6 leading-relaxed">{member.description}</p>

						<div>
							<p class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Specialties</p>
							<div class="flex flex-wrap gap-2">
								{#each member.specialties as specialty}
									<span class="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
										{specialty}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Qualifications Section -->
<section class="py-24 bg-gray-50">
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
				<div class="flex gap-4 items-start bg-white rounded-2xl p-6 shadow-sm">
					<div class="flex-shrink-0 rounded-xl bg-emerald-100 p-3 text-emerald-600">
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

				<div class="flex gap-4 items-start bg-white rounded-2xl p-6 shadow-sm">
					<div class="flex-shrink-0 rounded-xl bg-emerald-100 p-3 text-emerald-600">
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

				<div class="flex gap-4 items-start bg-white rounded-2xl p-6 shadow-sm">
					<div class="flex-shrink-0 rounded-xl bg-emerald-100 p-3 text-emerald-600">
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
<section class="bg-emerald-600 py-24">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-4xl font-bold text-white sm:text-5xl mb-6">
				Ready to Experience Quality Care?
			</h2>
			<p class="text-xl text-emerald-50 mb-10 leading-relaxed">
				Book an appointment with our professional team today.
			</p>
			<a
				href="/booking"
				class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
			>
				Book an Appointment
				<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</div>
</section>
