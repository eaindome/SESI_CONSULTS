<script lang="ts">
	import { GraduationCap, Users, Clock, Award, BookOpen, Target } from '@lucide/svelte';
	import { Hero } from '$lib';

	const trainingAreas = [
		{
			icon: BookOpen,
			name: 'Wound Care & Dressing Techniques',
			description: 'Master advanced wound assessment, modern dressing applications, and infection prevention protocols.',
			level: 'All Levels',
			duration: '4-8 hours',
			skills: [
				'Wound assessment and documentation',
				'Advanced dressing techniques',
				'Infection control protocols',
				'Healing progress evaluation'
			]
		},
		{
			icon: Target,
			name: 'Catheterization & IV Therapy',
			description: 'Develop expertise in sterile catheter insertion, IV line placement, and fluid management.',
			level: 'Intermediate to Advanced',
			duration: '6-10 hours',
			skills: [
				'Urinary catheterization',
				'IV line insertion and management',
				'Fluid balance monitoring',
				'Complication prevention'
			]
		},
		{
			icon: Award,
			name: 'Emergency & Trauma Care',
			description: 'Build confidence in emergency response, triage, and critical care interventions.',
			level: 'Intermediate to Advanced',
			duration: '8-12 hours',
			skills: [
				'Emergency assessment',
				'Basic and advanced life support',
				'Trauma management',
				'Emergency medications'
			]
		},
		{
			icon: Users,
			name: 'Patient Mobility & Transfer',
			description: 'Learn safe patient handling, transfer techniques, and mobility assistance protocols.',
			level: 'All Levels',
			duration: '3-6 hours',
			skills: [
				'Safe patient transfer techniques',
				'Mobility aids utilization',
				'Fall prevention strategies',
				'Body mechanics and safety'
			]
		},
		{
			icon: BookOpen,
			name: 'Post-Operative Care',
			description: 'Specialized training in post-surgical monitoring, pain management, and recovery support.',
			level: 'Intermediate',
			duration: '6-8 hours',
			skills: [
				'Post-op vital signs monitoring',
				'Pain assessment and management',
				'Surgical site care',
				'Complication recognition'
			]
		},
		{
			icon: Target,
			name: 'Pediatric Nursing Skills',
			description: 'Age-appropriate assessment, communication, and care techniques for children.',
			level: 'All Levels',
			duration: '6-10 hours',
			skills: [
				'Pediatric assessment',
				'Child-friendly communication',
				'Medication administration',
				'Family-centered care'
			]
		},
		{
			icon: Award,
			name: 'Geriatric Care Techniques',
			description: 'Comprehensive care strategies for elderly patients with complex health needs.',
			level: 'All Levels',
			duration: '6-8 hours',
			skills: [
				'Geriatric assessment',
				'Dementia care approaches',
				'Medication management',
				'Quality of life enhancement'
			]
		},
		{
			icon: Users,
			name: 'Medical Equipment Operation',
			description: 'Hands-on training with essential medical devices and monitoring equipment.',
			level: 'All Levels',
			duration: '4-6 hours',
			skills: [
				'Vital signs equipment',
				'Oxygen delivery systems',
				'Suction equipment',
				'Monitoring devices'
			]
		}
	];

	const trainingFormats = [
		{
			icon: Users,
			name: 'One-on-One Training',
			description: 'Personalized instruction tailored to your specific learning needs and pace.',
			benefits: ['Individual attention', 'Custom pacing', 'Focused skill development']
		},
		{
			icon: GraduationCap,
			name: 'Small Group Sessions',
			description: 'Collaborative learning with 2-5 participants for peer interaction and practice.',
			benefits: ['Peer learning', 'Team skills', 'Cost-effective']
		},
		{
			icon: BookOpen,
			name: 'Workshop Programs',
			description: 'Intensive group workshops for 6+ participants with hands-on practice.',
			benefits: ['Comprehensive coverage', 'Group practice', 'Networking opportunities']
		}
	];

	const instructors = [
		{
			name: 'Stephen EtornaM Salu',
			role: 'Emergency Nursing Instructor',
			credentials: 'RN, 8+ years experience',
			specialty: 'Emergency & Trauma Care',
			image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&q=80'
		},
		{
			name: 'Esi Yacoba Ghartey',
			role: 'Pediatric Nursing Instructor',
			credentials: 'RN, 6+ years experience',
			specialty: 'Pediatric Care Techniques',
			image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&q=80'
		},
		{
			name: 'Mame Esi Kesewah Eshun',
			role: 'Surgical Skills Instructor',
			credentials: 'RN, Senior Staff Nurse, 6+ years',
			specialty: 'Post-Operative & Surgical Care',
			image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&q=80'
		}
	];

	const benefits = [
		{
			icon: Clock,
			title: 'Flexible Scheduling',
			description: 'Choose from weekday mornings, afternoons, evenings, or weekend sessions to fit your schedule.'
		},
		{
			icon: Award,
			title: 'Hands-On Practice',
			description: 'Real-world scenarios and supervised practice with actual equipment and materials.'
		},
		{
			icon: Users,
			title: 'Expert Instructors',
			description: 'Learn from experienced nurses and healthcare professionals actively practicing in the field.'
		}
	];
</script>

<svelte:head>
	<title>Nurse Training Programs - SESI Healthcare</title>
	<meta name="description" content="Practical nursing skills training and professional development for nursing students and practicing nurses." />
</svelte:head>

<Hero
	title="Practical Nursing <br/>Skills Training"
	subtitle="Hands-on professional development for nursing students and working nurses. Build confidence and competence in essential clinical skills."
	badge="Training Programs"
	variant="gradient"
	decorative={true}
/>

<!-- Training Areas -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Available Training Areas</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Modular, skills-based training designed for practical application in clinical settings
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
			{#each trainingAreas as area}
				<div class="rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100">
					<div class="inline-flex items-center justify-center rounded-xl bg-emerald-100 p-4 mb-6">
						<svelte:component this={area.icon} class="h-7 w-7 text-emerald-600" />
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-3">{area.name}</h3>
					<p class="text-gray-600 mb-4 leading-relaxed text-sm">{area.description}</p>

					<div class="flex items-center gap-4 mb-4">
						<div class="flex items-center gap-2 text-xs text-gray-600">
							<Clock class="h-4 w-4 text-emerald-600" />
							<span>{area.duration}</span>
						</div>
						<span class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
							{area.level}
						</span>
					</div>

					<div class="space-y-2">
						<p class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Key Skills:</p>
						<ul class="space-y-1.5">
							{#each area.skills as skill}
								<li class="flex items-start text-xs text-gray-600">
									<svg class="mr-2 h-4 w-4 shrink-0 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
									</svg>
									{skill}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Training Formats -->
<section class="py-24 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Training Formats</h2>
			<p class="text-xl text-gray-600">
				Choose the learning format that best fits your needs and learning style
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
			{#each trainingFormats as format}
				<div class="rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100">
					<div class="inline-flex items-center justify-center rounded-xl bg-emerald-100 p-4 mb-6">
						<svelte:component this={format.icon} class="h-7 w-7 text-emerald-600" />
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-3">{format.name}</h3>
					<p class="text-gray-600 mb-6 leading-relaxed">{format.description}</p>
					<div class="space-y-2">
						<p class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Benefits:</p>
						<ul class="space-y-2">
							{#each format.benefits as benefit}
								<li class="flex items-start text-sm text-gray-600">
									<svg class="mr-2 h-5 w-5 shrink-0 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
									</svg>
									{benefit}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Instructors -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Meet Your Instructors</h2>
			<p class="text-xl text-gray-600">
				Learn from experienced professionals actively working in healthcare
			</p>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-3 max-w-5xl mx-auto">
			{#each instructors as instructor}
				<div class="rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
					<div class="h-80 overflow-hidden bg-gray-100">
						<img
							src={instructor.image}
							alt={instructor.name}
							loading="lazy"
							decoding="async"
							class="w-full h-full object-cover"
						/>
					</div>
					<div class="p-6">
						<h3 class="text-lg font-bold text-gray-900 mb-2">{instructor.name}</h3>
						<p class="text-emerald-600 font-semibold text-sm mb-1">{instructor.role}</p>
						<p class="text-xs text-gray-600 mb-3">{instructor.credentials}</p>
						<div class="pt-3 border-t border-gray-100">
							<p class="text-xs font-semibold text-gray-900 mb-1">Specializes in:</p>
							<p class="text-sm text-gray-600">{instructor.specialty}</p>
						</div>
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
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Why Train With Us</h2>
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
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">How to Enroll</h2>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					1
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">Choose Your Training</h3>
					<p class="text-gray-600 leading-relaxed">
						Select the skill area, experience level, and preferred training format that matches your needs.
					</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					2
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">Book Your Session</h3>
					<p class="text-gray-600 leading-relaxed">
						Request your preferred schedule and we'll coordinate with our instructors to confirm your training session.
					</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-full bg-emerald-600 h-14 w-14 flex items-center justify-center text-white text-xl font-bold">
					3
				</div>
				<div>
					<h3 class="mb-2 text-xl font-bold text-gray-900">Build Your Skills</h3>
					<p class="text-gray-600 leading-relaxed">
						Attend hands-on training sessions and gain practical experience under expert supervision.
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
				Ready to Enhance Your Nursing Skills?
			</h2>
			<p class="text-xl text-emerald-50 mb-10 leading-relaxed">
				Invest in your professional development. Request training enrollment today and take your clinical skills to the next level.
			</p>
			<a
				href="/booking"
				class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
			>
				Enroll in Training
				<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</div>
</section>
