<script lang="ts">
	const team = [
		{
			name: 'Sister Adebayo',
			role: 'Senior Registered Nurse',
			credentials: 'RN, BSN',
			experience: '12+ years experience',
			specialties: ['General Nursing', 'Chronic Disease Management', 'Post-Operative Care'],
			description: 'Dedicated healthcare professional with extensive experience in home healthcare and patient-centered care.'
		},
		{
			name: 'Nurse Chukwu',
			role: 'Registered Nurse',
			credentials: 'RN',
			experience: '8+ years experience',
			specialties: ['Maternal Care', 'Newborn Care', 'Elderly Care'],
			description: 'Compassionate nurse specializing in maternal and child health with a gentle approach to care.'
		},
		{
			name: 'Sister Okafor',
			role: 'Registered Nurse',
			credentials: 'RN, Certified Wound Care Specialist',
			experience: '10+ years experience',
			specialties: ['Wound Care', 'Post-Surgical Care', 'IV Therapy'],
			description: 'Expert in wound management and post-surgical care with a focus on promoting healing and comfort.'
		},
		{
			name: 'Nurse Mohammed',
			role: 'Registered Nurse',
			credentials: 'RN, Diabetes Educator',
			experience: '7+ years experience',
			specialties: ['Diabetes Management', 'Health Education', 'Medication Management'],
			description: 'Skilled in chronic disease management and patient education, helping patients achieve better health outcomes.'
		}
	];
</script>

<svelte:head>
	<title>Meet Our Team - SESI Healthcare</title>
	<meta name="description" content="Meet our team of experienced, licensed healthcare professionals dedicated to providing quality home care." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-emerald-50 to-blue-50 py-16 sm:py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
				Meet Our Care Team
			</h1>
			<p class="mt-6 text-lg text-gray-600">
				Experienced, licensed professionals dedicated to your health and well-being
			</p>
		</div>
	</div>
</section>

<!-- Team Grid -->
<section class="py-16 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
			{#each team as member}
				<div class="rounded-xl border border-gray-200 bg-white p-8 hover:border-emerald-200 hover:shadow-lg transition-all">
					<!-- Avatar Placeholder -->
					<div class="mb-6 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 mx-auto flex items-center justify-center">
						<span class="text-4xl font-bold text-white">{member.name.split(' ')[1][0]}</span>
					</div>

					<div class="text-center mb-6">
						<h3 class="text-2xl font-semibold text-gray-900 mb-1">{member.name}</h3>
						<p class="text-emerald-600 font-medium mb-1">{member.role}</p>
						<p class="text-sm text-gray-600 mb-1">{member.credentials}</p>
						<p class="text-sm text-gray-500">{member.experience}</p>
					</div>

					<p class="text-gray-600 text-center mb-6">{member.description}</p>

					<div>
						<p class="text-sm font-medium text-gray-900 mb-3 text-center">Specialties:</p>
						<div class="flex flex-wrap gap-2 justify-center">
							{#each member.specialties as specialty}
								<span class="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
									{specialty}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Qualifications Section -->
<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-bold text-gray-900 mb-6">Our Standards</h2>
			<p class="text-lg text-gray-600 mb-8">
				Every member of our team meets rigorous professional standards to ensure you receive
				the highest quality care.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
				<div class="bg-white rounded-lg p-6 border border-gray-200">
					<div class="mb-3 inline-flex items-center justify-center rounded-lg bg-emerald-100 p-2 text-emerald-600">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 class="font-semibold text-gray-900 mb-2">Licensed & Certified</h3>
					<p class="text-sm text-gray-600">
						All nurses are registered and hold current licenses with relevant certifications.
					</p>
				</div>

				<div class="bg-white rounded-lg p-6 border border-gray-200">
					<div class="mb-3 inline-flex items-center justify-center rounded-lg bg-emerald-100 p-2 text-emerald-600">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
						</svg>
					</div>
					<h3 class="font-semibold text-gray-900 mb-2">Background Checked</h3>
					<p class="text-sm text-gray-600">
						Comprehensive background checks and verification of all credentials.
					</p>
				</div>

				<div class="bg-white rounded-lg p-6 border border-gray-200">
					<div class="mb-3 inline-flex items-center justify-center rounded-lg bg-emerald-100 p-2 text-emerald-600">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
					</div>
					<h3 class="font-semibold text-gray-900 mb-2">Ongoing Training</h3>
					<p class="text-sm text-gray-600">
						Regular continuing education to stay current with best practices and protocols.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-emerald-600 py-16">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold text-white sm:text-4xl">
				Ready to Experience Quality Care?
			</h2>
			<p class="mt-4 text-lg text-emerald-50">
				Book an appointment with our professional team today.
			</p>
			<div class="mt-8">
				<a
					href="/booking"
					class="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
				>
					Book an Appointment
				</a>
			</div>
		</div>
	</div>
</section>
