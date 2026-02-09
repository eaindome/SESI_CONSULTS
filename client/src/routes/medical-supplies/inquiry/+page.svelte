<script lang="ts">
	import { User, Mail, Phone, MapPin, MessageSquare, X } from '@lucide/svelte';
	import { Hero } from '$lib';
	import { inquiryCart } from '$lib/stores/inquiryCart.svelte';
	import { goto } from '$app/navigation';

	// Form state
	let fullName = $state('');
	let email = $state('');
	let phone = $state('');
	let address = $state('');
	let message = $state('');

	// UI state
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');

	// Field-level errors
	let errors = $state({
		fullName: '',
		email: '',
		phone: '',
		address: ''
	});

	let touched = $state({
		fullName: false,
		email: false,
		phone: false,
		address: false
	});

	function validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function validatePhone(phone: string): boolean {
		const cleanPhone = phone.replace(/\s/g, '');
		return cleanPhone.length >= 10 && /^(\+233|0)[0-9]{9,10}$/.test(cleanPhone);
	}

	function formatPhoneNumber(value: string): string {
		const cleaned = value.replace(/[^\d+]/g, '');

		if (cleaned.startsWith('+233')) {
			const numbers = cleaned.substring(4);
			if (numbers.length <= 3) return `+233 ${numbers}`;
			if (numbers.length <= 6) return `+233 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
			return `+233 ${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
		} else if (cleaned.startsWith('0')) {
			if (cleaned.length <= 3) return cleaned;
			if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
			return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
		}
		return cleaned;
	}

	function validateField(field: string, value: string): string {
		switch (field) {
			case 'fullName':
				return !value ? 'Please enter your full name' : value.length < 3 ? 'Name must be at least 3 characters' : '';
			case 'email':
				return !value ? 'Please enter your email' : !validateEmail(value) ? 'Please enter a valid email address' : '';
			case 'phone':
				return !value ? 'Please enter your phone number' : !validatePhone(value) ? 'Please enter a valid Ghana phone number' : '';
			case 'address':
				return !value ? 'Please enter your address' : value.length < 10 ? 'Please enter a complete address' : '';
			default:
				return '';
		}
	}

	function handleBlur(field: string) {
		touched[field] = true;
		const value = { fullName, email, phone, address }[field];
		errors[field] = validateField(field, value);
	}

	function handlePhoneInput(e: Event) {
		const input = e.target as HTMLInputElement;
		const formatted = formatPhoneNumber(input.value);
		phone = formatted;
		if (touched.phone) {
			errors.phone = validateField('phone', formatted);
		}
	}

	function validateAllFields(): boolean {
		const fields = ['fullName', 'email', 'phone', 'address'];
		let isValid = true;

		fields.forEach(field => {
			touched[field] = true;
			const value = { fullName, email, phone, address }[field];
			const error = validateField(field, value);
			errors[field] = error;
			if (error) isValid = false;
		});

		return isValid;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		submitError = '';
		submitSuccess = false;

		if (inquiryCart.count === 0) {
			submitError = 'Please add at least one item to your inquiry list.';
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		if (!validateAllFields()) {
			submitError = 'Please fix the errors in the form before submitting.';
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		isSubmitting = true;

		try {
			const inquiryData = {
				items: inquiryCart.items,
				contactDetails: {
					name: fullName,
					email,
					phone,
					address
				},
				message: message || undefined
			};

			// Replace with actual API endpoint
			const response = await fetch('/api/medical-supplies/inquiry', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(inquiryData)
			});

			if (!response.ok) {
				throw new Error('Failed to submit inquiry');
			}

			submitSuccess = true;
			// Clear cart and form
			inquiryCart.clear();
			fullName = '';
			email = '';
			phone = '';
			address = '';
			message = '';

			// Reset errors and touched
			errors = {
				fullName: '',
				email: '',
				phone: '',
				address: ''
			};
			touched = {
				fullName: false,
				email: false,
				phone: false,
				address: false
			};

			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			submitError = 'Unable to submit inquiry. Please try again or contact us directly.';
			console.error('Inquiry error:', error);
		} finally {
			isSubmitting = false;
		}
	}

	function removeItem(itemId: string) {
		inquiryCart.remove(itemId);
	}
</script>

<svelte:head>
	<title>Inquiry List - Medical Supplies - SESI Healthcare</title>
	<meta name="description" content="Review your medical supplies inquiry and request a quote." />
</svelte:head>

<Hero
	title="Request a Quote"
	subtitle="Review your selected items and submit your inquiry. We'll respond with pricing and availability."
	badge="Inquiry"
	variant="gradient"
	decorative={true}
/>

<section class="py-24 bg-gradient-to-b from-white to-gray-50/50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-4xl">
			{#if submitSuccess}
				<div class="mb-8 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-lg shadow-emerald-100/50 animate-fade-in">
					<div class="flex items-start">
						<div class="shrink-0 rounded-full bg-emerald-600 p-1">
							<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="font-semibold text-emerald-900">Inquiry Submitted Successfully!</h3>
							<p class="mt-2 text-sm text-emerald-700">
								Thank you for your inquiry. Our team will review your request and contact you shortly with pricing and availability information.
							</p>
							<div class="mt-4">
								<a href="/medical-supplies" class="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
									← Browse More Products
								</a>
							</div>
						</div>
					</div>
				</div>
			{/if}

			{#if submitError}
				<div class="mb-8 rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-6 shadow-lg shadow-red-100/50 animate-fade-in">
					<div class="flex items-start">
						<div class="shrink-0 rounded-full bg-red-600 p-1">
							<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="font-semibold text-red-900">Error</h3>
							<p class="mt-2 text-sm text-red-700">{submitError}</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Selected Items -->
			<div class="mb-10">
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-2xl font-bold text-gray-900">Selected Items ({inquiryCart.count})</h2>
					<a
						href="/medical-supplies"
						class="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
					>
						← Browse More Products
					</a>
				</div>

				{#if inquiryCart.count === 0}
					<div class="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
						<p class="text-gray-600 mb-4">Your inquiry list is empty</p>
						<a
							href="/medical-supplies"
							class="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-all"
						>
							Browse Medical Supplies
						</a>
					</div>
				{:else}
					<div class="rounded-xl border border-gray-200 bg-white divide-y divide-gray-200">
						{#each inquiryCart.items as item (item.id)}
							<div class="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
								{#if item.image}
									<img
										src={item.image}
										alt={item.name}
										class="h-20 w-20 rounded-lg object-cover"
									/>
								{:else}
									<div class="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center">
										<span class="text-gray-400 text-sm">No image</span>
									</div>
								{/if}
								<div class="flex-1">
									<h3 class="font-semibold text-gray-900">{item.name}</h3>
									<p class="text-sm text-gray-600">{item.category}</p>
								</div>
								<button
									onclick={() => removeItem(item.id)}
									class="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
									aria-label="Remove {item.name}"
								>
									<X class="h-5 w-5" />
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Contact Form -->
			{#if inquiryCart.count > 0}
				<div class="relative">
					<div class="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-20"></div>

					<form onsubmit={handleSubmit} class="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 space-y-8">
						<div>
							<h2 class="text-2xl font-bold text-gray-900 mb-2">Your Contact Information</h2>
							<p class="text-gray-600">We'll use this information to send you the quote</p>
						</div>

						<div class="space-y-6">
							<!-- Full Name -->
							<div class="group">
								<label for="name" class="mb-2 flex items-center text-sm font-semibold text-gray-900">
									<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
										<User class="h-4 w-4 text-emerald-600" />
									</div>
									Full Name <span class="text-red-500 ml-1" aria-label="required">*</span>
								</label>
								<input
									type="text"
									id="name"
									bind:value={fullName}
									onblur={() => handleBlur('fullName')}
									required
									aria-required="true"
									aria-invalid={touched.fullName && errors.fullName ? 'true' : 'false'}
									aria-describedby={errors.fullName ? 'name-error' : undefined}
									placeholder="John Doe"
									class="w-full rounded-xl border-2 {touched.fullName && errors.fullName ? 'border-red-500' : 'border-gray-200'} bg-white px-4 py-3.5 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 {touched.fullName && errors.fullName ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} hover:border-gray-300"
								/>
								{#if touched.fullName && errors.fullName}
									<p id="name-error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
										<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
										</svg>
										{errors.fullName}
									</p>
								{/if}
							</div>

							<!-- Email & Phone -->
							<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div class="group">
									<label for="email" class="mb-2 flex items-center text-sm font-semibold text-gray-900">
										<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
											<Mail class="h-4 w-4 text-emerald-600" />
										</div>
										Email <span class="text-red-500 ml-1" aria-label="required">*</span>
									</label>
									<input
										type="email"
										id="email"
										bind:value={email}
										onblur={() => handleBlur('email')}
										required
										aria-required="true"
										aria-invalid={touched.email && errors.email ? 'true' : 'false'}
										aria-describedby={errors.email ? 'email-error' : undefined}
										placeholder="john@example.com"
										class="w-full rounded-xl border-2 {touched.email && errors.email ? 'border-red-500' : 'border-gray-200'} bg-white px-4 py-3.5 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 {touched.email && errors.email ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} hover:border-gray-300"
									/>
									{#if touched.email && errors.email}
										<p id="email-error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
											<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
												<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
											</svg>
											{errors.email}
										</p>
									{/if}
								</div>

								<div class="group">
									<label for="phone" class="mb-2 flex items-center text-sm font-semibold text-gray-900">
										<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
											<Phone class="h-4 w-4 text-emerald-600" />
										</div>
										Phone Number <span class="text-red-500 ml-1" aria-label="required">*</span>
									</label>
									<input
										type="tel"
										id="phone"
										bind:value={phone}
										oninput={handlePhoneInput}
										onblur={() => handleBlur('phone')}
										required
										aria-required="true"
										aria-invalid={touched.phone && errors.phone ? 'true' : 'false'}
										aria-describedby={errors.phone ? 'phone-error' : undefined}
										placeholder="+233 XXX XXX XXXX"
										class="w-full rounded-xl border-2 {touched.phone && errors.phone ? 'border-red-500' : 'border-gray-200'} bg-white px-4 py-3.5 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 {touched.phone && errors.phone ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} hover:border-gray-300"
									/>
									{#if touched.phone && errors.phone}
										<p id="phone-error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
											<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
												<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
											</svg>
											{errors.phone}
										</p>
									{/if}
								</div>
							</div>

							<!-- Address -->
							<div class="group">
								<label for="address" class="mb-2 flex items-center text-sm font-semibold text-gray-900">
									<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
										<MapPin class="h-4 w-4 text-emerald-600" />
									</div>
									Delivery Address <span class="text-red-500 ml-1" aria-label="required">*</span>
								</label>
								<textarea
									id="address"
									bind:value={address}
									onblur={() => handleBlur('address')}
									required
									aria-required="true"
									aria-invalid={touched.address && errors.address ? 'true' : 'false'}
									aria-describedby={errors.address ? 'address-error' : undefined}
									rows="2"
									placeholder="123 Street Name, Area, City"
									class="w-full rounded-xl border-2 {touched.address && errors.address ? 'border-red-500' : 'border-gray-200'} bg-white px-4 py-3.5 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 {touched.address && errors.address ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} hover:border-gray-300 resize-none"
								></textarea>
								{#if touched.address && errors.address}
									<p id="address-error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
										<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
										</svg>
										{errors.address}
									</p>
								{/if}
							</div>

							<!-- Additional Message -->
							<div class="group">
								<label for="message" class="mb-2 flex items-center text-sm font-semibold text-gray-900">
									<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
										<MessageSquare class="h-4 w-4 text-emerald-600" />
									</div>
									Additional Information <span class="text-gray-500 font-normal ml-1">(Optional)</span>
								</label>
								<textarea
									id="message"
									bind:value={message}
									rows="4"
									placeholder="Any specific requirements, quantities, or questions..."
									class="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 hover:border-gray-300 resize-none"
								></textarea>
							</div>
						</div>

						<!-- Submit Button -->
						<div class="pt-6">
							<button
								type="submit"
								disabled={isSubmitting || inquiryCart.count === 0}
								class="group relative w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none overflow-hidden"
							>
								<span class="relative z-10 flex items-center justify-center gap-2">
									{#if isSubmitting}
										<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Submitting...
									{:else}
										Submit Inquiry Request
										<svg class="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									{/if}
								</span>
								<div class="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
							</button>
						</div>
					</form>
				</div>
			{/if}
		</div>
	</div>
</section>
