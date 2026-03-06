<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Heart, Clock, Shield, Users, CheckCircle2, Star, MapPin, Calendar, Stethoscope, CalendarDays, Phone, Activity, Syringe } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';

	function generateEcgPath(): string {
		const y0 = 70; const bw = 130;
		let d = `M -60,${y0}`;
		for (let i = 0; i < 30; i++) {
			const x = i * bw - 60;
			d += ` L ${x+15},${y0} Q ${x+22},${y0-8} ${x+30},${y0} L ${x+40},${y0}`;
			d += ` L ${x+44},${y0+6} L ${x+50},${y0-50} L ${x+56},${y0+12} L ${x+63},${y0}`;
			d += ` Q ${x+83},${y0-18} ${x+103},${y0} L ${x+130},${y0}`;
		}
		return d;
	}
	const ecgPathData = generateEcgPath();

	const features = [
		{
			icon: Heart,
			title: 'Compassionate Care',
			description: 'Professional nurses who treat you like family, providing personalized attention in the comfort of your home.'
		},
		{
			icon: Clock,
			title: 'Flexible Scheduling',
			description: 'Book appointments that fit your schedule. Available 24/7 for urgent care needs.'
		},
		{
			icon: Shield,
			title: 'Licensed & Insured',
			description: 'All our healthcare professionals are fully licensed, certified, and background-checked for your safety.'
		},
		{
			icon: Users,
			title: 'Family-Centered',
			description: 'We involve your loved ones in the care process, ensuring everyone feels supported and informed.'
		}
	];

	const stats = [
		{ target: 500, suffix: '+',  label: 'Patients Served' },
		{ target: 4,   suffix: '+',  label: 'Expert Nurses' },
		{ target: 24,  suffix: '/7', label: 'Always Available' },
		{ target: 100, suffix: '%',  label: 'Licensed & Certified' }
	];

	const testimonials = [
		{
			name: 'Amara K.',
			location: 'East Legon, Accra',
			stars: 5,
			text: 'Sister Adebayo was wonderful — attentive, professional and so kind. My mother recovered so much faster in the comfort of home.',
			color: '#1a5f4a',
			service: 'General Nursing'
		},
		{
			name: 'Kofi A.',
			location: 'Cantonments, Accra',
			stars: 5,
			text: 'Booking was seamless and the nurse arrived right on time. Outstanding post-surgery support — I felt cared for every step of recovery.',
			color: '#0288d1',
			service: 'Post-Operative Care'
		},
		{
			name: 'Fatima M.',
			location: 'Labone, Accra',
			stars: 5,
			text: 'I was nervous about home nursing but the team immediately put me at ease. Genuinely exceptional service from start to finish.',
			color: '#267d63',
			service: 'Chronic Disease Management'
		},
		{
			name: 'Emmanuel O.',
			location: 'Tema, Greater Accra',
			stars: 5,
			text: 'The 24/7 availability gave our whole family peace of mind. Knowing help was always a call away made all the difference.',
			color: '#607d8b',
			service: 'Elderly Care'
		},
		{
			name: 'Abena S.',
			location: 'Airport Residential, Accra',
			stars: 5,
			text: 'Incredible care for my elderly father. Patient, kind and incredibly knowledgeable. We could not have asked for better.',
			color: '#4caf50',
			service: 'Elderly Care'
		},
		{
			name: 'Yaw D.',
			location: 'Adenta, Accra',
			stars: 5,
			text: 'From booking to care delivery the whole experience was flawless. I will absolutely be using SESI Homecare & Medical Supplies again.',
			color: '#0d3d2d',
			service: 'Injection Services'
		}
	];

	const steps = [
		{
			icon: CalendarDays,
			title: 'Book an Appointment',
			description: 'Choose your service, date and preferred time through our simple online form — it takes under two minutes.'
		},
		{
			icon: Phone,
			title: 'We Confirm & Match',
			description: 'Our care coordinator reviews your request and matches you with the ideal nurse for your specific needs.'
		},
		{
			icon: Heart,
			title: 'Your Nurse Arrives',
			description: 'A verified, licensed nurse arrives at your door, fully equipped and ready to deliver exceptional care.'
		}
	];

	const previewServices = [
		{
			icon: Heart,
			title: 'General Nursing',
			description: 'Routine check-ups, wound care, medication management and continuous health monitoring by qualified nurses.',
			tag: 'Most Popular'
		},
		{
			icon: Activity,
			title: 'Post-Surgical Care',
			description: 'Skilled post-operative monitoring, dressing changes, drain management and recovery support at home.',
			tag: 'Surgical'
		},
		{
			icon: Syringe,
			title: 'Injection & IV Therapy',
			description: 'Subcutaneous and intramuscular injections, IV cannulation, infusion therapy and blood draws at home.',
			tag: 'Specialised'
		}
	];

	// Animation state
	let isHeroVisible = $state(false);
	let showCards    = $state(false);
	let featureElements: HTMLElement[] = [];
	let isFeatureVisible = $state(Array(features.length).fill(false));

	// How It Works + Services Preview state
	let activeStepIndex: number | null = $state(null);
	let hiwActivated = $state([false, false, false]);
	let ecgClipRectEl: SVGRectElement;
	let ecgEraseRectEl: SVGRectElement;
	let ecgPulseGroupEl: SVGGElement;
	let hiwSectionEl: HTMLElement;
	let hiwElements: HTMLElement[] = [];
	let isHiwVisible = $state(Array(steps.length).fill(false));
	let svcElements: HTMLElement[] = [];
	let isSvcVisible = $state(Array(previewServices.length).fill(false));

	// Stats count-up
	let statCounts   = $state(stats.map(() => 0));
	let statsSection: HTMLElement;
	let statsTriggered = false;

	function easeOutCubic(t: number): number {
		return 1 - Math.pow(1 - t, 3);
	}

	function runCountUp(targetValue: number, index: number, duration = 1800) {
		const start = performance.now();
		function frame(now: number) {
			const elapsed  = now - start;
			const progress = Math.min(elapsed / duration, 1);
			statCounts[index] = Math.round(easeOutCubic(progress) * targetValue);
			if (progress < 1) requestAnimationFrame(frame);
		}
		requestAnimationFrame(frame);
	}

	onMount(() => {
		setTimeout(() => { isHeroVisible = true; }, 100);
		setTimeout(() => { showCards = true; }, 900);

		// Feature breathe-in observer
		const featureObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const index = featureElements.indexOf(entry.target as HTMLElement);
					if (index !== -1) {
						setTimeout(() => { isFeatureVisible[index] = true; }, index * 160);
					}
					featureObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });

		featureElements.forEach(el => featureObserver.observe(el));

		// Stats count-up observer
		const statsObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !statsTriggered) {
					statsTriggered = true;
					stats.forEach((stat, i) => {
						setTimeout(() => runCountUp(stat.target, i), i * 120);
					});
					statsObserver.disconnect();
				}
			});
		}, { threshold: 0.3 });

		if (statsSection) statsObserver.observe(statsSection);

		// How It Works breathe-in observer
		const hiwObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const index = hiwElements.indexOf(entry.target as HTMLElement);
					if (index !== -1) setTimeout(() => { isHiwVisible[index] = true; }, index * 140);
					hiwObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });
		hiwElements.forEach(el => hiwObserver.observe(el));

		// Services preview breathe-in observer
		const svcObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const index = svcElements.indexOf(entry.target as HTMLElement);
					if (index !== -1) setTimeout(() => { isSvcVisible[index] = true; }, index * 140);
					svcObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });
		svcElements.forEach(el => svcObserver.observe(el));

		// ── ECG heartbeat snake — JS-driven, starts when section enters view ──
		let ecgRafId = 0;
		let ecgCycleStopped = false;
		const ecgTimerIds: ReturnType<typeof setTimeout>[] = [];

		function runEcgAnimation() {
			if (!ecgClipRectEl || ecgCycleStopped) return;
			const windowW = 420; // viewBox units — ~3 PQRST cycles visible at once
			const startX  = -(windowW + 60);
			const endX    = 3900;
			const travelRange = endX - startX;
			const duration    = 4500; // ms to cross the full width

			// Cards at ~30 / 50 / 70% of the journey
			[0.30, 0.50, 0.70].forEach((ratio, idx) => {
				ecgTimerIds.push(setTimeout(() => { hiwActivated[idx] = true; }, ratio * duration));
			});
			ecgTimerIds.push(setTimeout(() => {
				hiwActivated[0] = false; hiwActivated[1] = false; hiwActivated[2] = false;
			}, duration + 700));

			const t0 = performance.now();
			function frame(now: number) {
				const p = Math.min((now - t0) / duration, 1);
				const currentX = startX + travelRange * p;
				ecgClipRectEl.setAttribute('x',  String(currentX));
				ecgEraseRectEl.setAttribute('x', String(currentX));
				const opacity = p < 0.06 ? p / 0.06 : p > 0.92 ? (1 - p) / 0.08 : 1;
				ecgPulseGroupEl.setAttribute('opacity', String(opacity));
				if (p < 1) {
					ecgRafId = requestAnimationFrame(frame);
				} else {
					if (!ecgCycleStopped) ecgTimerIds.push(setTimeout(runEcgAnimation, 1500));
				}
			}
			ecgRafId = requestAnimationFrame(frame);
		}

		// Only start once the section scrolls into view — 5 s initial delay
		const hiwInViewObserver = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				ecgTimerIds.push(setTimeout(runEcgAnimation, 2000));
				hiwInViewObserver.disconnect();
			}
		}, { threshold: 0.3 });
		if (hiwSectionEl) hiwInViewObserver.observe(hiwSectionEl);

		return () => {
			featureElements.forEach(el => featureObserver.unobserve(el));
			featureObserver.disconnect();
			statsObserver.disconnect();
			hiwObserver.disconnect();
			svcObserver.disconnect();
			ecgCycleStopped = true;
			cancelAnimationFrame(ecgRafId);
			ecgTimerIds.forEach(clearTimeout);
			hiwInViewObserver.disconnect();
		};
	});
</script>

<svelte:head>
	<title>SESI Homecare & Medical Supplies - Home Nursing Services</title>
	<meta name="description" content="Professional home healthcare services delivered with compassion. Book trusted nurses for in-home care." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden min-h-screen flex items-center">
	<!-- Background image + dark overlay -->
	<div class="absolute inset-0 z-0">
		<img
			src="/images/hero-home.webp"
			alt="African healthcare professional providing home care"
			class="w-full h-full object-cover"
		/>
		<div class="absolute inset-0 bg-linear-to-r from-gray-900/92 via-gray-900/80 to-gray-900/55"></div>
	</div>

	<!-- SVG dot pattern -->
	<div class="absolute inset-0 opacity-5 pointer-events-none z-1]">
		<svg width="100%" height="100%">
			<pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
				<circle cx="3" cy="3" r="1.5" fill="#4caf50" />
			</pattern>
			<rect width="100%" height="100%" fill="url(#dots)" />
		</svg>
	</div>

	<!-- Heartbeat pulse orb + emanating rings -->
	<!-- <div class="absolute right-[22%] top-1/2 -translate-y-1/2 z-1 hidden lg:block pointer-events-none">
		Focal orb — the heartbeat centre
		<div class="pulse-orb">
			<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none"
				stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				Medical cross
				<path d="M12 5v14M5 12h14" />
			</svg>
		</div>
		Concentric ripple rings
		<div class="pulse-ring pulse-ring-1"></div>
		<div class="pulse-ring pulse-ring-2"></div>
		<div class="pulse-ring pulse-ring-3"></div>
	</div> -->

	<!-- Ambient blobs -->
	<div class="absolute -top-24 -left-24 w-96 h-96 bg-[#1a5f4a]/15 rounded-full blur-3xl z-1"></div>
	<div class="absolute bottom-16 left-1/3 w-48 h-48 bg-[#4caf50]/15 rounded-full blur-2xl z-1"></div>

	<div class="relative z-10 w-full container mx-auto px-6 sm:px-8 lg:px-12 py-32 lg:py-40">
		<div class="flex flex-col lg:flex-row items-center gap-16">

			<!-- LEFT: Copy -->
			{#if isHeroVisible}
				<div class="lg:w-[52%] max-w-2xl" in:fly={{ y: 30, duration: 800, delay: 0 }}>

					<!-- Live badge -->
					<!-- <div in:fly={{ y: 20, duration: 600, delay: 200 }}
						class="inline-flex items-center gap-2 px-4 py-2 bg-[#4caf50]/20 backdrop-blur-sm border border-[#4caf50]/30 rounded-full text-[#4caf50] text-sm font-semibold mb-8">
						<span class="w-2 h-2 rounded-full bg-[#4caf50] animate-pulse"></span>
						Professional Home Healthcare · Accra, Ghana
					</div> -->

					<h1 in:fly={{ y: 20, duration: 700, delay: 350 }}
					class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl leading-tight mb-6">
						Quality Care in the
						<span class="text-[#4caf50]">Comfort of Your Home</span>
					</h1>

					<p in:fly={{ y: 20, duration: 600, delay: 500 }}
						class="text-xl text-gray-200 leading-relaxed mb-10">
						Professional home nursing delivered with compassion and excellence.
						Trusted, licensed nurses available 24/7.
					</p>

					<div in:fly={{ y: 20, duration: 500, delay: 650 }} class="flex flex-col sm:flex-row gap-4 mb-12">
						<Button variant="primary" size="lg" href="/booking">
							Book an Appointment
							<svg slot="icon" class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Button>
						<Button variant="inverse-outline" size="lg" href="/services">
							View Services
						</Button>
					</div>

					<!-- Trust badges row -->
					<div in:fly={{ y: 20, duration: 500, delay: 800 }} class="flex flex-wrap gap-x-6 gap-y-3">
						<div class="flex items-center gap-2 text-gray-300">
							<div class="w-8 h-8 rounded-full bg-[#1a5f4a]/50 flex items-center justify-center shrink-0">
								<Shield class="h-4 w-4 text-[#4caf50]" />
							</div>
							<span class="text-sm font-medium">Licensed & Insured</span>
						</div>
						<div class="flex items-center gap-2 text-gray-300">
							<div class="w-8 h-8 rounded-full bg-[#1a5f4a]/50 flex items-center justify-center shrink-0">
								<Clock class="h-4 w-4 text-[#4caf50]" />
							</div>
							<span class="text-sm font-medium">Available 24/7</span>
						</div>
						<div class="flex items-center gap-2 text-gray-300">
							<div class="w-8 h-8 rounded-full bg-[#1a5f4a]/50 flex items-center justify-center shrink-0">
								<Heart class="h-4 w-4 text-[#4caf50]" />
							</div>
							<span class="text-sm font-medium">Family-Centred Care</span>
						</div>
					</div>
				</div>
			{/if}

			<!-- RIGHT: Appointment dashboard card + floating micro-cards -->
			<!-- <div class="lg:w-[48%] relative hidden lg:flex items-center justify-center min-h-135">
				{#if showCards}

					Main appointment card
					<div class="relative z-10 w-full max-w-sm" in:fly={{ y: 50, duration: 800, delay: 0 }}>
						<div class="bg-white rounded-3xl shadow-2xl p-7 card-bob">

							Card header
							<div class="flex items-center justify-between mb-6">
								<div>
									<p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Today's Appointment</p>
									<p class="text-sm text-gray-500">March 5, 2026</p>
								</div>
								<span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4caf50]/15 text-[#1a5f4a] text-xs font-bold rounded-full">
									<span class="w-1.5 h-1.5 bg-[#4caf50] rounded-full"></span>
									Confirmed
								</span>
							</div>

							Nurse info
							<div class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
								<div class="relative shrink-0">
									<img
										src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=120&h=120&fit=crop&q=80"
										alt="Sister Adebayo"
										class="w-16 h-16 rounded-2xl object-cover"
									/>
									<span class="absolute -bottom-1 -right-1 w-5 h-5 bg-[#4caf50] rounded-full border-2 border-white flex items-center justify-center">
										<svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
										</svg>
									</span>
								</div>
								<div>
									<p class="font-bold text-gray-900">Sister Adebayo</p>
									<p class="text-sm text-[#1a5f4a] font-medium">Senior Registered Nurse</p>
									<div class="flex items-center gap-0.5 mt-1">
										{#each Array(5) as _, j (j)}
											<Star class="h-3 w-3 text-[#f4b400] fill-[#f4b400]" />
										{/each}
										<span class="text-xs text-gray-500 ml-1">5.0</span>
									</div>
								</div>
							</div>

							Appointment details
							<div class="space-y-3 mb-7">
								<div class="flex items-center gap-3 text-sm text-gray-600">
									<div class="w-8 h-8 rounded-xl bg-[#1a5f4a]/10 flex items-center justify-center shrink-0">
										<Calendar class="h-4 w-4 text-[#1a5f4a]" />
									</div>
									<span>Today · 2:30 PM – 4:00 PM</span>
								</div>
								<div class="flex items-center gap-3 text-sm text-gray-600">
									<div class="w-8 h-8 rounded-xl bg-[#1a5f4a]/10 flex items-center justify-center shrink-0">
										<Stethoscope class="h-4 w-4 text-[#1a5f4a]" />
									</div>
									<span>General Nursing Care</span>
								</div>
								<div class="flex items-center gap-3 text-sm text-gray-600">
									<div class="w-8 h-8 rounded-xl bg-[#1a5f4a]/10 flex items-center justify-center shrink-0">
										<MapPin class="h-4 w-4 text-[#1a5f4a]" />
									</div>
									<span>Accra, East Legon</span>
								</div>
							</div>

							Book CTA
							<a href="/booking"
								class="flex items-center justify-center w-full py-3 px-5 bg-[#1a5f4a] hover:bg-[#0d3d2d] text-white text-sm font-semibold rounded-xl transition-colors duration-200">
								Book Your Appointment
								<svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</div>

					Micro-card 1: Nurse en route (top-left)
					<div class="absolute top-6 -left-12 z-20" in:fly={{ x: -40, y: -20, duration: 700, delay: 300 }}>
						<div class="bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 w-56 card-bob-slow">
							<span class="relative flex h-3 w-3 shrink-0">
								<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4caf50] opacity-75"></span>
								<span class="relative inline-flex rounded-full h-3 w-3 bg-[#4caf50]"></span>
							</span>
							<div>
								<p class="text-xs font-bold text-gray-800">Nurse en route</p>
								<p class="text-xs text-gray-500">~12 mins away</p>
							</div>
						</div>
					</div>

					Micro-card 2: Star rating (bottom-right)
					<div class="absolute -bottom-2 -right-10 z-20" in:fly={{ x: 40, y: 30, duration: 700, delay: 500 }}>
						<div class="bg-white rounded-2xl shadow-xl px-4 py-3 w-52 card-bob-delayed">
							<div class="flex items-center gap-2 mb-1">
								<div class="flex">
									{#each Array(5) as _, k (k)}
										<Star class="h-3.5 w-3.5 text-[#f4b400] fill-[#f4b400]" />
									{/each}
								</div>
								<span class="text-xs font-bold text-gray-800">5.0</span>
							</div>
							<p class="text-xs text-gray-500 italic">"Excellent care, highly recommend!"</p>
						</div>
					</div>

					Micro-card 3: Verified badge (far left, mid)
					<div class="absolute top-1/2 -translate-y-1/2 -left-16 z-20" in:fly={{ x: -50, duration: 700, delay: 700 }}>
						<div class="bg-[#1a5f4a] rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 w-52 card-bob">
							<div class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
								<CheckCircle2 class="h-4 w-4 text-white" />
							</div>
							<div>
								<p class="text-xs font-bold text-white">All nurses verified</p>
								<p class="text-xs text-white/70">Licensed & insured</p>
							</div>
						</div>
					</div>

				{/if}
			</div> -->
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="py-20 md:py-32 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="text-center mb-12 md:mb-20">
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl mb-5">Why Choose SESI Homecare?</h2>
			<p class="text-xl text-gray-600 max-w-2xl mx-auto">
				We provide exceptional care that puts your needs first
			</p>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-2 max-w-5xl mx-auto">
			{#each features as feature, i (feature.title ?? i)}
				<div
					bind:this={featureElements[i]}
					class="flex gap-5 items-start group {isFeatureVisible[i] ? 'breathe-visible' : 'breathe-hidden'}"
					style="transition-delay: {i * 60}ms"
				>
					<div class="shrink-0 rounded-2xl bg-[#1a5f4a]/10 p-5 text-[#1a5f4a] transition-all duration-300 group-hover:bg-[#1a5f4a] group-hover:text-white group-hover:scale-110">
						<feature.icon class="h-7 w-7" />
					</div>
					<div>
						<h3 class="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
						<p class="text-gray-600 leading-relaxed">{feature.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="py-20 md:py-32 bg-[#f0f7f5] relative overflow-hidden" bind:this={hiwSectionEl}>
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">

		<div class="text-center mb-10 md:mb-16">
			<div class="inline-block px-4 py-1.5 bg-[#1a5f4a]/10 text-[#1a5f4a] text-sm font-semibold rounded-full mb-4">
				How It Works
			</div>
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl mb-5">From Booking to Bedside</h2>
			<p class="text-xl text-gray-600 max-w-2xl mx-auto">
				Three simple steps to professional care at your door
			</p>
		</div>

		<!-- Steps wrapper — ECG SVG behind, cards in front -->
		<div class="relative max-w-5xl mx-auto">

			<!-- ECG Waveform — rAF-driven heartbeat snake (desktop only) -->
			<div class="absolute hidden md:block pointer-events-none z-0"
				style="top: 50%; left: calc(-50vw + 50%); width: 100vw; transform: translateY(-50%)">
				<svg viewBox="0 0 3840 120" preserveAspectRatio="none"
					class="w-full" style="height: 130px; overflow: visible">
					<defs>
						<clipPath id="ecg-pulse-clip">
							<!-- rect starts off-screen left; JS moves it right each frame -->
							<rect bind:this={ecgClipRectEl} x="-480" y="0" width="420" height="120" />
						</clipPath>
					</defs>
					<!-- Flat baseline — steady flatline, always visible -->
					<line
						x1="-60" y1="70" x2="3900" y2="70"
						stroke="#1a5f4a"
						stroke-width="1.5"
						opacity="0.22"
						vector-effect="non-scaling-stroke"
					/>
					<!-- Moving pulse group: opacity controlled by JS -->
					<g bind:this={ecgPulseGroupEl} opacity="0">
						<!-- Section-bg rect erases the flat line inside the active pulse window -->
						<rect bind:this={ecgEraseRectEl} x="-480" y="63" width="420" height="14" fill="#f0f7f5" />
						<!-- PQRST zigzag, clipped to the moving window so only that window shows as zigzag -->
						<path
							d={ecgPathData}
							clip-path="url(#ecg-pulse-clip)"
							fill="none"
							stroke="#1a5f4a"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							vector-effect="non-scaling-stroke"
						/>
					</g>
				</svg>
			</div>

			<!-- 3 Step Cards -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
				{#each steps as step, i (step.title ?? i)}
					<div
						bind:this={hiwElements[i]}
						role="group"
						onmouseenter={() => (activeStepIndex = i)}
						onmouseleave={() => (activeStepIndex = null)}
					class="step-card {activeStepIndex === i || hiwActivated[i] ? 'step-card-active' : ''} {isHiwVisible[i] ? 'breathe-visible' : 'breathe-hidden'}"
					style="transition-delay: {i * 120}ms"
				>
					<div class="flex items-center justify-between mb-6">
						<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300
							{activeStepIndex === i || hiwActivated[i] ? 'bg-[#1a5f4a] text-white' : 'bg-white text-[#1a5f4a] border border-[#1a5f4a]/20'}">
							<step.icon class="h-7 w-7" />
						</div>
						<span class="step-badge">0{i + 1}</span>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
					<p class="text-gray-600 leading-relaxed text-sm">{step.description}</p>
				</div>
				{/each}
			</div>

		</div>

	</div>
</section>

<!-- Services Preview Section -->
<section class="py-20 md:py-32 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">

		<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
			<div>
				<div class="inline-block px-4 py-1.5 bg-[#1a5f4a]/10 text-[#1a5f4a] text-sm font-semibold rounded-full mb-4">
					Our Services
				</div>
				<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl mb-4">What We Offer</h2>
				<p class="text-xl text-gray-600 max-w-lg">
					Professional nursing services designed around your needs
				</p>
			</div>
			<a href="/services"
				class="inline-flex items-center gap-2 shrink-0 text-[#1a5f4a] font-semibold border border-[#1a5f4a]/30 px-5 py-2.5 rounded-xl hover:bg-[#1a5f4a] hover:text-white transition-all duration-300 text-sm self-start sm:self-auto">
				See All Services
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each previewServices as svc, i (svc.title ?? i)}
				<a
					href="/services"
					bind:this={svcElements[i]}
					class="service-preview-card group {isSvcVisible[i] ? 'breathe-visible' : 'breathe-hidden'}"
					style="transition-delay: {i * 100}ms"
				>
					<div class="flex items-start justify-between mb-6">
						<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1a5f4a]/10 text-[#1a5f4a] transition-all duration-300 group-hover:bg-[#1a5f4a] group-hover:text-white group-hover:scale-110">
							<svc.icon class="h-7 w-7" />
						</div>
						<span class="text-xs font-semibold text-[#1a5f4a] bg-[#1a5f4a]/8 px-3 py-1 rounded-full">{svc.tag}</span>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1a5f4a] transition-colors duration-300">{svc.title}</h3>
					<p class="text-gray-600 leading-relaxed text-sm mb-6">{svc.description}</p>
					<div class="flex items-center text-[#1a5f4a] text-sm font-semibold mt-auto">
						Learn more
						<svg class="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</div>
				</a>
			{/each}
		</div>

	</div>
</section>

<!-- Stats Section -->
<section class="py-20 bg-[#f0f7f5]">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div bind:this={statsSection}
			class="grid grid-cols-2 gap-y-12 gap-x-8 lg:grid-cols-4 max-w-4xl mx-auto">
			{#each stats as stat, i (stat.label ?? i)}
				<div class="flex flex-col items-center text-center group">
					<div class="text-5xl sm:text-6xl font-bold text-[#1a5f4a] mb-3 tabular-nums leading-none">
						{statCounts[i]}<span class="text-[#f4b400]">{stat.suffix}</span>
					</div>
					<div class="h-0.5 bg-[#f4b400] mb-3 transition-all duration-500 ease-out w-8 group-hover:w-14"></div>
					<p class="text-sm font-semibold text-gray-500 uppercase tracking-widest">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Testimonials Section -->
<section class="py-16 md:py-24 bg-white overflow-hidden">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12 mb-10 md:mb-14">
		<div class="text-center">
			<div class="inline-block px-4 py-1.5 bg-[#1a5f4a]/10 text-[#1a5f4a] text-sm font-semibold rounded-full mb-4">
				Patient Stories
			</div>
			<h2 class="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl mb-4">What Our Patients Say</h2>
			<p class="text-xl text-gray-500 max-w-xl mx-auto">
				Real experiences from families who trust SESI Homecare & Medical Supplies
			</p>
		</div>
	</div>

	<!-- Carousel viewport with edge fades -->
	<div class="carousel-pause carousel-viewport">
		<div class="carousel-track">
			<!-- Set 1 -->
			{#each testimonials as t, i (i)}
				<div class="carousel-card">
					<div class="flex gap-0.5 mb-5">
						{#each Array(t.stars) as _, j (j)}
							<Star class="h-4 w-4 text-[#f4b400] fill-[#f4b400]" />
						{/each}
					</div>
					<p class="text-gray-700 leading-relaxed text-sm italic flex-1 mb-6">
						"{t.text}"
					</p>
					<div class="mt-auto pt-5 border-t border-gray-100 flex items-center gap-3">
						<div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
							style="background-color: {t.color}">
							{t.name[0]}
						</div>
						<div>
							<p class="font-semibold text-gray-900 text-sm">{t.name}</p>
							<p class="text-xs text-gray-400">{t.location}</p>
						</div>
						<span class="ml-auto text-xs font-medium text-[#1a5f4a] bg-[#1a5f4a]/8 px-2.5 py-1 rounded-full whitespace-nowrap">
							{t.service}
						</span>
					</div>
				</div>
			{/each}
			<!-- Set 2: duplicate for seamless loop -->
			{#each testimonials as t, i (i)}
				<div class="carousel-card" aria-hidden="true">
					<div class="flex gap-0.5 mb-5">
						{#each Array(t.stars) as _, j (j)}
							<Star class="h-4 w-4 text-[#f4b400] fill-[#f4b400]" />
						{/each}
					</div>
					<p class="text-gray-700 leading-relaxed text-sm italic flex-1 mb-6">
						"{t.text}"
					</p>
					<div class="mt-auto pt-5 border-t border-gray-100 flex items-center gap-3">
						<div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
							style="background-color: {t.color}">
							{t.name[0]}
						</div>
						<div>
							<p class="font-semibold text-gray-900 text-sm">{t.name}</p>
							<p class="text-xs text-gray-400">{t.location}</p>
						</div>
						<span class="ml-auto text-xs font-medium text-[#1a5f4a] bg-[#1a5f4a]/8 px-2.5 py-1 rounded-full whitespace-nowrap">
							{t.service}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-linear-to-br from-[#1a5f4a] to-[#0d3d2d] py-16 md:py-24">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-5">
				Ready to Get Started?
			</h2>
			<p class="text-xl text-white/90 mb-10 leading-relaxed">
				Book an appointment today and experience quality healthcare at home. Our professional team is ready to care for you and your loved ones.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="inverse" size="lg" href="/booking" elevation>
					Book Now
					<svg slot="icon" class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</Button>
				<Button variant="inverse-outline" size="lg" href="/contact">
					Contact Us
				</Button>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Floating card bob animations ── */
	@keyframes bob {
		0%, 100% { transform: translateY(0px); }
		50%       { transform: translateY(-10px); }
	}
	@keyframes bob-slow {
		0%, 100% { transform: translateY(0px); }
		50%       { transform: translateY(-7px); }
	}
	@keyframes bob-delayed {
		0%, 100% { transform: translateY(0px); }
		50%       { transform: translateY(-8px); }
	}

	.card-bob         { animation: bob         4s   ease-in-out infinite; }
	.card-bob-slow    { animation: bob-slow    5s   ease-in-out infinite; animation-delay: 0.8s; }
	.card-bob-delayed { animation: bob-delayed 4.5s ease-in-out infinite; animation-delay: 1.6s; }

	/* ── Heartbeat pulse orb + rings ── */
	.pulse-orb {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: rgba(26, 95, 74, 0.82);
		border: 2px solid rgba(76, 175, 80, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		box-shadow:
			0 0 0 6px rgba(76, 175, 80, 0.12),
			0 0 32px rgba(76, 175, 80, 0.30),
			inset 0 0 14px rgba(76, 175, 80, 0.15);
	}

	@keyframes pulse-ring {
		0%   { transform: translate(-50%, -50%) scale(0.8); opacity: 0.4; }
		100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
	}

	.pulse-ring {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 240px;
		height: 240px;
		border-radius: 50%;
		border: 2px solid rgba(76, 175, 80, 0.35);
		animation: pulse-ring 3.6s ease-out infinite;
	}
	.pulse-ring-1 { animation-delay: 0s;   }
	.pulse-ring-2 { animation-delay: 1.2s; }
	.pulse-ring-3 { animation-delay: 2.4s; }

	/* ── Breathe-in section entrances ── */
	.breathe-hidden {
		opacity: 0;
		transform: scale(0.97);
		filter: blur(4px);
		will-change: transform, opacity, filter;
		transition:
			opacity  0.65s ease-out,
			transform 0.65s ease-out,
			filter   0.55s ease-out;
	}
	.breathe-visible {
		opacity: 1;
		transform: scale(1);
		filter: blur(0px);
		will-change: transform, opacity, filter;
		transition:
			opacity  0.65s ease-out,
			transform 0.65s ease-out,
			filter   0.55s ease-out;
	}

	/* ── Testimonial carousel ── */
	@keyframes scroll-left {
		0%   { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	.carousel-viewport {
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 8%,
			black 92%,
			transparent 100%
		);
		mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 8%,
			black 92%,
			transparent 100%
		);
	}

	.carousel-track {
		display: flex;
		align-items: stretch;
		width: max-content;
		padding-bottom: 12px; /* room for card shadows */
		animation: scroll-left 34s linear infinite;
	}

	.carousel-pause:hover .carousel-track {
		animation-play-state: paused;
	}

	.carousel-card {
		width: 320px;
		shrink: 0;
		margin: 0 12px;
		background: white;
		border-radius: 20px;
		border: 1px solid #f0f0f0;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
		padding: 28px;
		display: flex;
		flex-direction: column;
		transition: box-shadow 0.3s ease, transform 0.3s ease;
	}

	.carousel-card:hover {
		box-shadow: 0 8px 40px rgba(26, 95, 74, 0.14);
		transform: translateY(-3px);
	}

	/* ── How It Works — ECG (no extra CSS needed; everything controlled by JS) ── */

	/* ── How It Works — step cards ── */
	.step-card {
		background: white;
		border-radius: 20px;
		border: 1.5px solid rgba(26, 95, 74, 0.18);
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
		padding: 2rem;
		transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
		cursor: default;
	}

	.step-card-active {
		border-color: rgba(26, 95, 74, 0.35);
		box-shadow: 0 8px 40px rgba(26, 95, 74, 0.12), 0 0 0 4px rgba(26, 95, 74, 0.05);
		transform: translateY(-4px);
	}

	.step-badge {
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		color: #1a5f4a;
		background: rgba(26, 95, 74, 0.1);
		padding: 0.3rem 0.75rem;
		border-radius: 999px;
	}

	/* ── Services Preview cards ── */
	.service-preview-card {
		background: white;
		border-radius: 20px;
		border: 1.5px solid #f0f0f0;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		text-decoration: none;
		transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
	}

	.service-preview-card:hover {
		border-color: rgba(26, 95, 74, 0.3);
		box-shadow: 0 8px 40px rgba(26, 95, 74, 0.12);
		transform: translateY(-3px);
	}
</style>
