<script lang="ts">
	import { User, Mail, FileText, Star, MessageSquare } from '@lucide/svelte';
	import { toasts } from '$lib/stores/toasts';
	import Button from '$lib/components/ui/Button.svelte';
	import CustomSelect from '$lib/components/ui/CustomSelect.svelte';

	const services = [
		'General Nursing Care',
		'Injection Services',
		'Post-Operative Care',
		'Chronic Disease Management',
		'Elderly Care',
		'Maternal & Child Care'
	];

	let fullName = $state('');
	let email = $state('');
	let selectedService = $state('');
	let rating = $state(0);
	let hoveredRating = $state(0);
	let message = $state('');

	let isSubmitting = $state(false);
	let errors = $state<Record<string, string>>({});

	const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

	function validate() {
		const e: Record<string, string> = {};
		if (!fullName.trim()) e.fullName = 'Please enter your name';
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email';
		if (rating === 0) e.rating = 'Please select a rating';
		if (!message.trim()) e.message = 'Please share your experience';
		return e;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		errors = {};

		const validation = validate();
		if (Object.keys(validation).length > 0) {
			errors = validation;
			toasts.error('Please fix the errors in the form');
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch('/api/feedback', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: fullName,
					email: email || undefined,
					rating,
					message,
					service: selectedService || undefined
				})
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || 'Failed to submit feedback');
			}

			toasts.success("Thank you! Your feedback has been received.");

			// Reset form
			fullName = '';
			email = '';
			selectedService = '';
			rating = 0;
			message = '';
			errors = {};

			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			toasts.error(error instanceof Error ? error.message : 'Unable to submit feedback. Please try again.');
			console.error('Feedback error:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Leave Feedback - SESI Homecare & Medical Supplies</title>
	<meta name="description" content="Share your experience with SESI Homecare. Your feedback helps us provide better care." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-linear-to-br from-[#1a5f4a] to-[#0d3d2d] py-24 sm:py-32">
	<!-- Decorative circles -->
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
		<div class="mx-auto max-w-3xl text-center">
			<div class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 animate-fade-in">
				Share Your Experience
			</div>
			<h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 animate-fade-in-up">
				How Did We Do?
			</h1>
			<p class="text-xl text-white/90 leading-relaxed animate-fade-in" style="animation-delay: 0.2s;">
				Your feedback helps us improve and deliver better care to every patient
			</p>
		</div>
	</div>
</section>

<!-- Feedback Form -->
<section class="py-16 md:py-24 bg-linear-to-b from-white to-gray-50/50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-2xl">
			<!-- Section title -->
			<div class="text-center mb-10">
				<div class="inline-block px-4 py-1.5 bg-[#1a5f4a]/10 text-[#1a5f4a] text-sm font-semibold rounded-full mb-4">
					Patient Feedback
				</div>
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tell Us About Your Experience</h2>
				<p class="text-lg text-gray-600">
					We read every review and use your feedback to improve our services.
				</p>
			</div>

			<!-- Form Card -->
			<div class="relative">
				<form onsubmit={handleSubmit} class="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 space-y-8">

					<!-- Rating -->
					<div class="group">
						<label class="mb-3 flex items-center text-sm font-semibold text-gray-900">
							<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 transition-colors" class:bg-red-100={errors.rating}>
								<Star class="h-4 w-4 text-[#1a5f4a]" />
							</div>
							Overall Rating
						</label>
						<div class="flex items-center gap-2">
							{#each [1, 2, 3, 4, 5] as star}
								<button
									type="button"
									onclick={() => { rating = star; errors = { ...errors, rating: '' }; }}
									onmouseenter={() => hoveredRating = star}
									onmouseleave={() => hoveredRating = 0}
									class="transition-transform hover:scale-110 focus:outline-none"
									aria-label="{star} star{star > 1 ? 's' : ''}"
								>
									<Star
										class="h-10 w-10 transition-colors {
											star <= (hoveredRating || rating)
												? 'fill-yellow-400 text-yellow-400'
												: 'text-gray-300'
										}"
									/>
								</button>
							{/each}
							{#if rating > 0}
								<span class="ml-2 text-sm font-medium text-gray-600">{ratingLabels[rating]}</span>
							{/if}
						</div>
						{#if errors.rating}
							<p class="mt-2 text-sm text-red-600 flex items-center gap-1">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
								</svg>
								{errors.rating}
							</p>
						{/if}
					</div>

					<!-- Service -->
					<div class="group">
						<label for="service" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
							<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
								<FileText class="h-4 w-4 text-[#1a5f4a]" />
							</div>
							Service Received <span class="text-gray-500 font-normal ml-1">(Optional)</span>
						</label>
						<CustomSelect
						id="service"
						bind:value={selectedService}
						options={services}
						placeholder="Select a service..."
					/>
					</div>

					<!-- Contact Details Section -->
					<div class="pt-2 pb-2">
						<div class="flex items-center mb-8">
							<div class="h-0.5 flex-1 bg-linear-to-r from-transparent via-[#4caf50]/20 to-transparent"></div>
							<h3 class="text-lg font-bold text-gray-900 px-5">Your Details</h3>
							<div class="h-0.5 flex-1 bg-linear-to-r from-transparent via-[#4caf50]/20 to-transparent"></div>
						</div>

						<div class="space-y-6">
							<!-- Full Name -->
							<div class="group">
								<label for="name" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
									<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
										<User class="h-4 w-4 text-[#1a5f4a]" />
									</div>
									Full Name
								</label>
								<input
									type="text"
									id="name"
									bind:value={fullName}
									required
									placeholder="John Doe"
									class="w-full rounded-2xl {errors.fullName ? 'bg-red-50' : 'bg-gray-50 hover:bg-gray-100 focus:bg-white'} px-5 py-4 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg border-0"
								/>
								{#if errors.fullName}
									<p class="mt-2 text-sm text-red-600 flex items-center gap-1">
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
										</svg>
										{errors.fullName}
									</p>
								{/if}
							</div>

							<!-- Email -->
							<div class="group">
								<label for="email" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
									<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
										<Mail class="h-4 w-4 text-[#1a5f4a]" />
									</div>
									Email <span class="text-gray-500 font-normal ml-1">(Optional)</span>
								</label>
								<input
									type="email"
									id="email"
									bind:value={email}
									placeholder="john@example.com"
									class="w-full rounded-2xl {errors.email ? 'bg-red-50' : 'bg-gray-50 hover:bg-gray-100 focus:bg-white'} px-5 py-4 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg border-0"
								/>
								{#if errors.email}
									<p class="mt-2 text-sm text-red-600 flex items-center gap-1">
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
										</svg>
										{errors.email}
									</p>
								{/if}
							</div>
						</div>
					</div>

					<!-- Message -->
					<div class="group">
						<label for="message" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
							<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
								<MessageSquare class="h-4 w-4 text-[#1a5f4a]" />
							</div>
							Your Message
						</label>
						<textarea
							id="message"
							bind:value={message}
							required
							rows="5"
							placeholder="Tell us about your experience with SESI Homecare..."
							class="w-full rounded-2xl {errors.message ? 'bg-red-50' : 'bg-gray-50 hover:bg-gray-100 focus:bg-white'} px-5 py-4 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg resize-none border-0"
						></textarea>
						{#if errors.message}
							<p class="mt-2 text-sm text-red-600 flex items-center gap-1">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
								</svg>
								{errors.message}
							</p>
						{/if}
					</div>

					<!-- Submit -->
					<div class="pt-6">
						<Button
							type="submit"
							variant="primary"
							size="lg"
							fullWidth
							loading={isSubmitting}
							loadingText="Submitting..."
							disabled={isSubmitting}
							elevation
						>
							Submit Feedback
							<svg slot="icon" class="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</Button>
						<p class="mt-4 text-center text-sm text-gray-500">
							Your feedback is anonymous unless you provide your email address.
						</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<!-- Why It Matters Section -->
<section class="py-20 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl">
			<h3 class="text-2xl font-bold text-gray-900 mb-10 text-center">Why Your Feedback Matters</h3>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="flex gap-3 items-start">
					<div class="shrink-0 rounded-full bg-[#1a5f4a] h-10 w-10 flex items-center justify-center text-white font-bold">
						1
					</div>
					<p class="text-gray-600 pt-1.5">We review every submission to understand your experience</p>
				</div>
				<div class="flex gap-3 items-start">
					<div class="shrink-0 rounded-full bg-[#1a5f4a] h-10 w-10 flex items-center justify-center text-white font-bold">
						2
					</div>
					<p class="text-gray-600 pt-1.5">Our team uses your input to improve training and care standards</p>
				</div>
				<div class="flex gap-3 items-start">
					<div class="shrink-0 rounded-full bg-[#1a5f4a] h-10 w-10 flex items-center justify-center text-white font-bold">
						3
					</div>
					<p class="text-gray-600 pt-1.5">Your voice helps shape a better experience for future patients</p>
				</div>
			</div>
		</div>
	</div>
</section>
