<script lang="ts">
	import { Star, Send, CheckCircle } from '@lucide/svelte';
	import { toasts } from '$lib/stores/toasts';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	const services = [
		'General Nursing Care',
		'Injection Services',
		'Post-Operative Care',
		'Chronic Disease Management',
		'Elderly Care',
		'Maternal & Child Care'
	];

	let form = $state({
		name: '',
		email: '',
		rating: 0,
		message: '',
		service: ''
	});

	let hoveredRating = $state(0);
	let isSubmitting = $state(false);
	let submitted = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (form.rating === 0) {
			toasts.error('Please select a rating');
			return;
		}

		isSubmitting = true;

		try {
			const response = await fetch('/api/feedback', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: form.name,
					email: form.email || undefined,
					rating: form.rating,
					message: form.message,
					service: form.service || undefined
				})
			});

			const data = await response.json();

			if (response.ok) {
				submitted = true;
			} else {
				toasts.error(data.message || 'Failed to submit feedback');
			}
		} catch (error) {
			toasts.error('Something went wrong. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Leave Feedback - SESI Consults</title>
</svelte:head>

<!-- Hero -->
<section class="bg-[#1a5f4a] text-white py-16">
	<div class="max-w-3xl mx-auto px-4 text-center">
		<h1 class="text-4xl font-bold mb-4">Share Your Experience</h1>
		<p class="text-lg text-white/80">Your feedback helps us provide better care for every patient</p>
	</div>
</section>

<section class="py-16 bg-gray-50 min-h-screen">
	<div class="max-w-2xl mx-auto px-4">

		{#if submitted}
			<!-- Success state -->
			<div class="bg-white rounded-2xl shadow-sm p-12 text-center">
				<div class="flex justify-center mb-6">
					<div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
						<CheckCircle class="h-10 w-10 text-green-600" />
					</div>
				</div>
				<h2 class="text-2xl font-bold text-gray-900 mb-3">Thank You!</h2>
				<p class="text-gray-600 mb-8">Your feedback has been received. We truly appreciate you taking the time to share your experience with us.</p>
				<div class="flex flex-col sm:flex-row gap-3 justify-center">
					<a
						href="/"
						class="inline-flex items-center justify-center px-6 py-3 bg-[#1a5f4a] text-white font-semibold rounded-xl hover:bg-[#0d3d2d] transition-colors"
					>
						Back to Home
					</a>
					<button
						onclick={() => { submitted = false; form = { name: '', email: '', rating: 0, message: '', service: '' }; }}
						class="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
					>
						Submit Another
					</button>
				</div>
			</div>
		{:else}
			<div class="bg-white rounded-2xl shadow-sm overflow-hidden">
				<div class="p-6 border-b border-gray-100">
					<h2 class="text-xl font-bold text-gray-900">Your Feedback</h2>
					<p class="text-sm text-gray-500 mt-1">All fields marked * are required</p>
				</div>

				<form onsubmit={handleSubmit} class="p-6 space-y-6">
					<!-- Star rating -->
					<div>
						<label class="block text-sm font-semibold text-gray-900 mb-3">
							Overall Rating *
						</label>
						<div class="flex gap-2">
							{#each [1, 2, 3, 4, 5] as star}
								<button
									type="button"
									onclick={() => form.rating = star}
									onmouseenter={() => hoveredRating = star}
									onmouseleave={() => hoveredRating = 0}
									class="transition-transform hover:scale-110 focus:outline-none"
									aria-label="{star} star{star > 1 ? 's' : ''}"
								>
									<Star
										class="h-9 w-9 transition-colors {
											star <= (hoveredRating || form.rating)
												? 'fill-yellow-400 text-yellow-400'
												: 'text-gray-300'
										}"
									/>
								</button>
							{/each}
							{#if form.rating > 0}
								<span class="ml-2 self-center text-sm text-gray-600">
									{['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][form.rating]}
								</span>
							{/if}
						</div>
					</div>

					<!-- Name -->
					<div>
						<label for="name" class="block text-sm font-semibold text-gray-900 mb-2">
							Full Name *
						</label>
						<input
							type="text"
							id="name"
							bind:value={form.name}
							required
							placeholder="e.g., Kwame Mensah"
							class="w-full rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20"
						/>
					</div>

					<!-- Email -->
					<div>
						<label for="email" class="block text-sm font-semibold text-gray-900 mb-2">
							Email <span class="text-gray-400 font-normal">(optional)</span>
						</label>
						<input
							type="email"
							id="email"
							bind:value={form.email}
							placeholder="your@email.com"
							class="w-full rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20"
						/>
					</div>

					<!-- Service -->
					<div>
						<label for="service" class="block text-sm font-semibold text-gray-900 mb-2">
							Service Received <span class="text-gray-400 font-normal">(optional)</span>
						</label>
						<select
							id="service"
							bind:value={form.service}
							class="w-full rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20 cursor-pointer"
						>
							<option value="">Select a service...</option>
							{#each services as s}
								<option value={s}>{s}</option>
							{/each}
						</select>
					</div>

					<!-- Message -->
					<div>
						<label for="message" class="block text-sm font-semibold text-gray-900 mb-2">
							Your Message *
						</label>
						<textarea
							id="message"
							bind:value={form.message}
							required
							rows="5"
							placeholder="Tell us about your experience with SESI Consults..."
							class="w-full rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20 resize-none"
						></textarea>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#1a5f4a] hover:bg-[#0d3d2d] disabled:opacity-60 text-white font-semibold rounded-xl shadow-lg transition-all"
					>
						{#if isSubmitting}
							<div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
							Submitting...
						{:else}
							<Send class="h-5 w-5" />
							Submit Feedback
						{/if}
					</button>
				</form>
			</div>
		{/if}
	</div>
</section>

<ToastContainer />
