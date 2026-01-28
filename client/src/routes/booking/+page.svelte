<script lang="ts">
	import { Calendar, Clock, User, Mail, Phone, MapPin, FileText } from '@lucide/svelte';
	import { Hero } from '$lib';

	// Form state
	let selectedService = $state('');
	let appointmentDate = $state('');
	let appointmentTime = $state('');
	let fullName = $state('');
	let email = $state('');
	let phone = $state('');
	let address = $state('');
	let notes = $state('');

	// UI state
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');

	// Field-level errors
	let errors = $state({
		service: '',
		date: '',
		time: '',
		fullName: '',
		email: '',
		phone: '',
		address: ''
	});

	// Touched fields (for showing errors only after user interaction)
	let touched = $state({
		service: false,
		date: false,
		time: false,
		fullName: false,
		email: false,
		phone: false,
		address: false
	});

	const services = [
		'General Nursing Care',
		'Injection Services',
		'Post-Operative Care',
		'Chronic Disease Management',
		'Elderly Care',
		'Maternal & Child Care'
	];

	const timeSlots = [
		'08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
		'12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
		'04:00 PM', '05:00 PM', '06:00 PM'
	];

	// Get today's date in YYYY-MM-DD format
	const today = new Date().toISOString().split('T')[0];

	// Validation functions
	function validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function validatePhone(phone: string): boolean {
		// Ghana phone format: +233 XXX XXX XXXX or 0XX XXX XXXX
		const cleanPhone = phone.replace(/\s/g, '');
		return cleanPhone.length >= 10 && /^(\+233|0)[0-9]{9,10}$/.test(cleanPhone);
	}

	function formatPhoneNumber(value: string): string {
		// Remove all non-digit characters except +
		const cleaned = value.replace(/[^\d+]/g, '');

		// Format: +233 XXX XXX XXXX
		if (cleaned.startsWith('+233')) {
			const numbers = cleaned.substring(4);
			if (numbers.length <= 3) return `+233 ${numbers}`;
			if (numbers.length <= 6) return `+233 ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
			return `+233 ${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
		}
		// Format: 0XX XXX XXXX
		else if (cleaned.startsWith('0')) {
			if (cleaned.length <= 3) return cleaned;
			if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
			return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
		}
		return cleaned;
	}

	function validateField(field: string, value: string): string {
		switch (field) {
			case 'service':
				return !value ? 'Please select a service' : '';
			case 'date':
				return !value ? 'Please select a date' : '';
			case 'time':
				return !value ? 'Please select a time' : '';
			case 'fullName':
				return !value ? 'Please enter your full name' : value.length < 3 ? 'Name must be at least 3 characters' : '';
			case 'email':
				return !value ? 'Please enter your email' : !validateEmail(value) ? 'Please enter a valid email address' : '';
			case 'phone':
				return !value ? 'Please enter your phone number' : !validatePhone(value) ? 'Please enter a valid Ghana phone number' : '';
			case 'address':
				return !value ? 'Please enter your home address' : value.length < 10 ? 'Please enter a complete address' : '';
			default:
				return '';
		}
	}

	function handleBlur(field: string) {
		touched[field] = true;
		const value = { service: selectedService, date: appointmentDate, time: appointmentTime, fullName, email, phone, address }[field];
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

	function handleEmailBlur() {
		touched.email = true;
		errors.email = validateField('email', email);
	}

	function validateAllFields(): boolean {
		const fields = ['service', 'date', 'time', 'fullName', 'email', 'phone', 'address'];
		let isValid = true;

		fields.forEach(field => {
			touched[field] = true;
			const value = { service: selectedService, date: appointmentDate, time: appointmentTime, fullName, email, phone, address }[field];
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

		// Validate all fields
		if (!validateAllFields()) {
			submitError = 'Please fix the errors in the form before submitting.';
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		isSubmitting = true;

		try {
			// Combine date and time
			const dateTime = new Date(`${appointmentDate}T${convertTo24Hour(appointmentTime)}`);

			const bookingData = {
				service: selectedService,
				dateTime: dateTime.toISOString(),
				contactDetails: {
					name: fullName,
					email,
					phone,
					address
				},
				notes: notes || undefined
			};

			// Replace with your actual API endpoint
			const response = await fetch('/api/bookings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bookingData)
			});

			if (!response.ok) {
				throw new Error('Failed to submit booking');
			}

			submitSuccess = true;
			// Reset form
			selectedService = '';
			appointmentDate = '';
			appointmentTime = '';
			fullName = '';
			email = '';
			phone = '';
			address = '';
			notes = '';

			// Reset errors and touched
			errors = {
				service: '',
				date: '',
				time: '',
				fullName: '',
				email: '',
				phone: '',
				address: ''
			};
			touched = {
				service: false,
				date: false,
				time: false,
				fullName: false,
				email: false,
				phone: false,
				address: false
			};

			// Scroll to success message
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			submitError = 'Unable to submit booking. Please try again or contact us directly.';
			console.error('Booking error:', error);
		} finally {
			isSubmitting = false;
		}
	}

	function convertTo24Hour(time12: string): string {
		const [time, period] = time12.split(' ');
		let [hours, minutes] = time.split(':');

		if (period === 'PM' && hours !== '12') {
			hours = String(Number(hours) + 12);
		} else if (period === 'AM' && hours === '12') {
			hours = '00';
		}

		return `${hours.padStart(2, '0')}:${minutes}:00`;
	}
</script>

<svelte:head>
	<title>Book an Appointment - SESI Healthcare</title>
	<meta name="description" content="Schedule your home healthcare appointment online. Choose your service, date, and time." />
</svelte:head>

<Hero
	title="Schedule Your <br/>Home Care Visit"
	subtitle="Choose a convenient time for professional healthcare delivered to your doorstep"
	badge="Book Now"
	variant="gradient"
	decorative={true}
/>

<!-- Booking Form -->
<section class="py-24 bg-gradient-to-b from-white to-gray-50/50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-2xl">
			{#if submitSuccess}
				<div class="mb-8 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-lg shadow-emerald-100/50 animate-fade-in">
					<div class="flex items-start">
						<div class="shrink-0 rounded-full bg-emerald-600 p-1">
							<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="font-semibold text-emerald-900">Booking Submitted Successfully!</h3>
							<p class="mt-2 text-sm text-emerald-700">
								We've received your appointment request. Our team will contact you shortly to confirm the details.
							</p>
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

			<!-- Form Card with enhanced styling -->
			<div class="relative">
				<!-- Decorative gradient border -->
				<div class="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-20"></div>

				<form onsubmit={handleSubmit} class="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 space-y-8">
					<!-- Service Selection -->
					<div class="group">
						<label for="service" class="mb-2 flex items-center text-sm font-semibold text-gray-900">
							<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
								<FileText class="h-4 w-4 text-emerald-600" />
							</div>
							Select Service <span class="text-red-500 ml-1" aria-label="required">*</span>
						</label>
						<select
							id="service"
							bind:value={selectedService}
							onblur={() => handleBlur('service')}
							required
							aria-required="true"
							aria-invalid={touched.service && errors.service ? 'true' : 'false'}
							aria-describedby={errors.service ? 'service-error' : undefined}
							class="w-full rounded-xl border-2 {touched.service && errors.service ? 'border-red-500' : 'border-gray-200'} bg-white px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 {touched.service && errors.service ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} hover:border-gray-300"
						>
							<option value="">Choose a service...</option>
							{#each services as service}
								<option value={service}>{service}</option>
							{/each}
						</select>
						{#if touched.service && errors.service}
							<p id="service-error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
								<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
								</svg>
								{errors.service}
							</p>
						{/if}
					</div>

					<!-- Date & Time -->
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div class="group">
							<label for="date" class="mb-2 flex items-center text-sm font-semibold text-gray-900">
								<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
									<Calendar class="h-4 w-4 text-emerald-600" />
								</div>
								Date <span class="text-red-500 ml-1" aria-label="required">*</span>
							</label>
							<input
								type="date"
								id="date"
								bind:value={appointmentDate}
								onblur={() => handleBlur('date')}
								min={today}
								required
								aria-required="true"
								aria-invalid={touched.date && errors.date ? 'true' : 'false'}
								aria-describedby={errors.date ? 'date-error' : undefined}
								class="w-full rounded-xl border-2 {touched.date && errors.date ? 'border-red-500' : 'border-gray-200'} bg-white px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 {touched.date && errors.date ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} hover:border-gray-300"
							/>
							{#if touched.date && errors.date}
								<p id="date-error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
									<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
									</svg>
									{errors.date}
								</p>
							{/if}
						</div>

						<div class="group">
							<label for="time" class="mb-2 flex items-center text-sm font-semibold text-gray-900">
								<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
									<Clock class="h-4 w-4 text-emerald-600" />
								</div>
								Time <span class="text-red-500 ml-1" aria-label="required">*</span>
							</label>
							<select
								id="time"
								bind:value={appointmentTime}
								onblur={() => handleBlur('time')}
								required
								aria-required="true"
								aria-invalid={touched.time && errors.time ? 'true' : 'false'}
								aria-describedby={errors.time ? 'time-error' : undefined}
								class="w-full rounded-xl border-2 {touched.time && errors.time ? 'border-red-500' : 'border-gray-200'} bg-white px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 {touched.time && errors.time ? 'focus:ring-red-500/10' : 'focus:ring-emerald-500/10'} hover:border-gray-300"
							>
								<option value="">Select time...</option>
								{#each timeSlots as slot}
									<option value={slot}>{slot}</option>
								{/each}
							</select>
							{#if touched.time && errors.time}
								<p id="time-error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
									<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
									</svg>
									{errors.time}
								</p>
							{/if}
						</div>
					</div>

					<!-- Contact Details Section -->
					<div class="pt-4 pb-2 border-t-2 border-gray-100">
						<div class="flex items-center mb-6">
							<div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
							<h3 class="text-lg font-bold text-gray-900 px-4">Contact Information</h3>
							<div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
						</div>

						<div class="space-y-6">
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
										onblur={handleEmailBlur}
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

							<div class="group">
								<label for="address" class="mb-2 flex items-center text-sm font-semibold text-gray-900">
									<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
										<MapPin class="h-4 w-4 text-emerald-600" />
									</div>
									Home Address <span class="text-red-500 ml-1" aria-label="required">*</span>
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
									placeholder="123 Street Name, Area, Accra"
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
						</div>
					</div>

					<!-- Additional Notes -->
					<div class="group">
						<label for="notes" class="mb-2 flex items-center text-sm font-semibold text-gray-900">
							<div class="p-1.5 rounded-lg bg-emerald-100 mr-2 group-focus-within:bg-emerald-200 transition-colors">
								<FileText class="h-4 w-4 text-emerald-600" />
							</div>
							Additional Notes <span class="text-gray-500 font-normal ml-1">(Optional)</span>
						</label>
						<textarea
							id="notes"
							bind:value={notes}
							rows="4"
							placeholder="Any specific requirements or information we should know..."
							class="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 hover:border-gray-300 resize-none"
						></textarea>
					</div>

					<!-- Submit Button -->
					<div class="pt-6">
						<button
							type="submit"
							disabled={isSubmitting}
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
									Book Appointment
									<svg class="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
									</svg>
								{/if}
							</span>
							<div class="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
						</button>
						<p class="mt-4 text-center text-sm text-gray-500">
							By submitting, you agree to our terms of service and privacy policy.
						</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<!-- Info Section -->
<section class="py-20 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl">
			<h3 class="text-2xl font-bold text-gray-900 mb-10 text-center">What Happens Next?</h3>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="flex gap-3 items-start">
					<div class="shrink-0 rounded-full bg-emerald-600 h-10 w-10 flex items-center justify-center text-white font-bold">
						1
					</div>
					<p class="text-gray-600 pt-1.5">We receive your booking request</p>
				</div>
				<div class="flex gap-3 items-start">
					<div class="shrink-0 rounded-full bg-emerald-600 h-10 w-10 flex items-center justify-center text-white font-bold">
						2
					</div>
					<p class="text-gray-600 pt-1.5">Our team contacts you to confirm details</p>
				</div>
				<div class="flex gap-3 items-start">
					<div class="shrink-0 rounded-full bg-emerald-600 h-10 w-10 flex items-center justify-center text-white font-bold">
						3
					</div>
					<p class="text-gray-600 pt-1.5">Your nurse arrives at the scheduled time</p>
				</div>
			</div>
		</div>
	</div>
</section>
