<script lang="ts">
	import { Calendar, Clock, User, Mail, Phone, MapPin, FileText, ArrowRight, CheckCircle2 } from '@lucide/svelte';
	import { Hero, Button, Alert, Card, FormField, Input, Select, Textarea } from '$lib';
	import { ALL_SERVICES, TIME_SLOTS, EXPERIENCE_LEVELS, TRAINING_FORMATS, SCHEDULING_PREFERENCES, BOOKING_SUCCESS_STEPS } from '$lib/constants';
	import { validateEmail, validatePhone, formatPhoneNumber, validateRequired, validateMinLength, validateSelect, convertTo24Hour, getTodayDate } from '$lib/utils/validation';
	import type { BookingFormData, BookingPayload } from '$lib/types/forms';

	// Form state
	let formData = $state<BookingFormData>({
		service: '',
		appointmentDate: '',
		appointmentTime: '',
		fullName: '',
		email: '',
		phone: '',
		address: '',
		notes: '',
		experienceLevel: '',
		preferredFormat: '',
		schedulingPreference: ''
	});

	// Validation state
	let errors = $state({
		service: '',
		appointmentDate: '',
		appointmentTime: '',
		fullName: '',
		email: '',
		phone: '',
		address: ''
	});

	let touched = $state({
		service: false,
		appointmentDate: false,
		appointmentTime: false,
		fullName: false,
		email: false,
		phone: false,
		address: false
	});

	// UI state
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');

	// Derived state
	const isTrainingService = $derived(formData.service.startsWith('Training -'));
	const today = getTodayDate();

	// Validation handlers
	function validateField(field: keyof typeof errors): void {
		switch (field) {
			case 'service':
				const serviceResult = validateSelect(formData.service, 'a service');
				errors.service = serviceResult.error || '';
				break;
			case 'appointmentDate':
				const dateResult = validateRequired(formData.appointmentDate, 'appointment date');
				errors.appointmentDate = dateResult.error || '';
				break;
			case 'appointmentTime':
				const timeResult = validateSelect(formData.appointmentTime, 'a time');
				errors.appointmentTime = timeResult.error || '';
				break;
			case 'fullName':
				const nameResult = validateMinLength(formData.fullName, 3, 'Full name');
				errors.fullName = nameResult.error || '';
				break;
			case 'email':
				const emailResult = validateEmail(formData.email);
				errors.email = emailResult.error || '';
				break;
			case 'phone':
				const phoneResult = validatePhone(formData.phone);
				errors.phone = phoneResult.error || '';
				break;
			case 'address':
				const addressResult = validateMinLength(formData.address, 10, 'Home address');
				errors.address = addressResult.error || '';
				break;
		}
	}

	function handleBlur(field: keyof typeof touched): void {
		touched[field] = true;
		validateField(field);
	}

	function handlePhoneInput(e: Event): void {
		const input = e.target as HTMLInputElement;
		formData.phone = formatPhoneNumber(input.value);
		if (touched.phone) {
			validateField('phone');
		}
	}

	function validateAllFields(): boolean {
		const fields: (keyof typeof errors)[] = ['service', 'appointmentDate', 'appointmentTime', 'fullName', 'email', 'phone', 'address'];
		let isValid = true;

		fields.forEach(field => {
			touched[field] = true;
			validateField(field);
			if (errors[field]) isValid = false;
		});

		return isValid;
	}

	async function handleSubmit(e: Event): Promise<void> {
		e.preventDefault();
		submitError = '';
		submitSuccess = false;

		if (!validateAllFields()) {
			submitError = 'Please fix the errors in the form before submitting.';
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		isSubmitting = true;

		try {
			const dateTime = new Date(`${formData.appointmentDate}T${convertTo24Hour(formData.appointmentTime)}`);

			const bookingData: BookingPayload = {
				service: formData.service,
				dateTime: dateTime.toISOString(),
				contactDetails: {
					name: formData.fullName,
					email: formData.email,
					phone: formData.phone,
					address: formData.address
				},
				notes: formData.notes || undefined,
				...(isTrainingService && {
					trainingDetails: {
						experienceLevel: formData.experienceLevel || undefined,
						preferredFormat: formData.preferredFormat || undefined,
						schedulingPreference: formData.schedulingPreference || undefined
					}
				})
			};

			const response = await fetch('/api/bookings', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(bookingData)
			});

			if (!response.ok) {
				throw new Error('Failed to submit booking');
			}

			submitSuccess = true;
			resetForm();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			submitError = 'Unable to submit booking. Please try again or contact us directly.';
			console.error('Booking error:', error);
		} finally {
			isSubmitting = false;
		}
	}

	function resetForm(): void {
		formData = {
			service: '',
			appointmentDate: '',
			appointmentTime: '',
			fullName: '',
			email: '',
			phone: '',
			address: '',
			notes: '',
			experienceLevel: '',
			preferredFormat: '',
			schedulingPreference: ''
		};

		errors = {
			service: '',
			appointmentDate: '',
			appointmentTime: '',
			fullName: '',
			email: '',
			phone: '',
			address: ''
		};

		touched = {
			service: false,
			appointmentDate: false,
			appointmentTime: false,
			fullName: false,
			email: false,
			phone: false,
			address: false
		};
	}
</script>

<svelte:head>
	<title>Book a Service - SESI Healthcare</title>
	<meta name="description" content="Book healthcare services, consultations, or training online. Choose your service, date, and time." />
</svelte:head>

<Hero
	title="Book Your <br/>Healthcare Service"
	subtitle="Schedule home care, consultations, or training sessions at your convenience"
	badge="Book Now"
	variant="gradient"
	decorative={true}
/>

<!-- Booking Form -->
<section class="relative py-28 overflow-hidden">
	<!-- Premium gradient background -->
	<div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30"></div>

	<!-- Decorative elements -->
	<div class="absolute top-20 right-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-20"></div>
	<div class="absolute bottom-20 left-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-20"></div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="mx-auto max-w-3xl">
			{#if submitSuccess}
				<Alert
					variant="success"
					title="Booking Submitted Successfully!"
					message="We've received your appointment request. Our team will contact you shortly to confirm the details."
					class="mb-10 animate-scale-in"
				/>
			{/if}

			{#if submitError}
				<Alert
					variant="error"
					title="Submission Error"
					message={submitError}
					class="mb-10 animate-scale-in"
				/>
			{/if}

			<!-- Enhanced Form Card -->
			<div class="relative group">
				<!-- Animated gradient glow -->
				<div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-3xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-gradient bg-[length:200%_200%]"></div>

				<div class="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden">
					<!-- Form header with icon -->
					<div class="bg-gradient-to-r from-emerald-600 to-teal-600 px-10 py-8">
						<div class="flex items-center gap-4">
							<div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
								<Calendar class="h-8 w-8 text-white" />
							</div>
							<div>
								<h2 class="text-3xl font-bold text-white">Appointment Details</h2>
								<p class="text-emerald-50 mt-1">Fill in your information below to book your service</p>
							</div>
						</div>
					</div>

					<form onsubmit={handleSubmit} class="p-10 space-y-10">
						<!-- Service Selection - Prominent -->
						<div class="space-y-4">
							<FormField
								label="Select Service"
								id="service"
								icon={FileText}
								required
								error={touched.service ? errors.service : ''}
								valid={touched.service && !errors.service && !!formData.service}
								showValidIcon
								class="mb-0"
							>
								<Select
									id="service"
									bind:value={formData.service}
									required
									error={touched.service && !!errors.service}
									placeholder="Choose the service you need..."
									onblur={() => handleBlur('service')}
									class="text-lg py-4"
								>
									{#each ALL_SERVICES as service}
										<option value={service}>{service}</option>
									{/each}
								</Select>
							</FormField>
						</div>

						<!-- Training-specific fields - Enhanced -->
						{#if isTrainingService}
							<div class="relative animate-fade-in-up">
								<div class="absolute -inset-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl blur-sm opacity-50"></div>
								<div class="relative bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-emerald-200 space-y-6">
									<div class="flex items-center gap-3 mb-4">
										<div class="bg-emerald-600 rounded-xl p-2">
											<FileText class="h-5 w-5 text-white" />
										</div>
										<h3 class="text-lg font-bold text-emerald-900">Training Preferences</h3>
										<span class="text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Optional</span>
									</div>

									<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
										<FormField label="Experience Level" id="experience-level">
											<Select id="experience-level" bind:value={formData.experienceLevel}>
												{#each EXPERIENCE_LEVELS as level}
													<option value={level.value}>{level.label}</option>
												{/each}
											</Select>
										</FormField>

										<FormField label="Preferred Format" id="format">
											<Select id="format" bind:value={formData.preferredFormat}>
												{#each TRAINING_FORMATS as format}
													<option value={format.value}>{format.label}</option>
												{/each}
											</Select>
										</FormField>
									</div>

									<FormField label="Scheduling Preference" id="schedule-pref">
										<Select id="schedule-pref" bind:value={formData.schedulingPreference}>
											{#each SCHEDULING_PREFERENCES as pref}
												<option value={pref.value}>{pref.label}</option>
											{/each}
										</Select>
									</FormField>
								</div>
							</div>
						{/if}

						<!-- Date & Time - Side by side with icons -->
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<FormField
								label="Appointment Date"
								id="date"
								icon={Calendar}
								required
								error={touched.appointmentDate ? errors.appointmentDate : ''}
								valid={touched.appointmentDate && !errors.appointmentDate && !!formData.appointmentDate}
								showValidIcon
							>
								<Input
									type="date"
									id="date"
									bind:value={formData.appointmentDate}
									min={today}
									required
									error={touched.appointmentDate && !!errors.appointmentDate}
									onblur={() => handleBlur('appointmentDate')}
									class="text-base"
								/>
							</FormField>

							<FormField
								label="Preferred Time"
								id="time"
								icon={Clock}
								required
								error={touched.appointmentTime ? errors.appointmentTime : ''}
								valid={touched.appointmentTime && !errors.appointmentTime && !!formData.appointmentTime}
								showValidIcon
							>
								<Select
									id="time"
									bind:value={formData.appointmentTime}
									required
									error={touched.appointmentTime && !!errors.appointmentTime}
									placeholder="Select your preferred time..."
									onblur={() => handleBlur('appointmentTime')}
								>
									{#each TIME_SLOTS as slot}
										<option value={slot}>{slot}</option>
									{/each}
								</Select>
							</FormField>
						</div>

						<!-- Visual separator -->
						<div class="relative py-6">
							<div class="absolute inset-0 flex items-center" aria-hidden="true">
								<div class="w-full border-t-2 border-gray-200"></div>
							</div>
							<div class="relative flex justify-center">
								<span class="bg-white px-6 text-base font-semibold text-gray-900 flex items-center gap-2">
									<User class="h-5 w-5 text-emerald-600" />
									Your Contact Information
								</span>
							</div>
						</div>

						<!-- Contact fields - Better spacing -->
						<div class="space-y-6">
							<FormField
								label="Full Name"
								id="name"
								icon={User}
								required
								error={touched.fullName ? errors.fullName : ''}
								valid={touched.fullName && !errors.fullName && !!formData.fullName}
								showValidIcon
							>
								<Input
									id="name"
									bind:value={formData.fullName}
									placeholder="John Doe"
									required
									autocomplete="name"
									error={touched.fullName && !!errors.fullName}
									onblur={() => handleBlur('fullName')}
								/>
							</FormField>

							<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<FormField
									label="Email Address"
									id="email"
									icon={Mail}
									required
									hint="We'll send confirmation to this email"
									error={touched.email ? errors.email : ''}
									valid={touched.email && !errors.email && !!formData.email}
									showValidIcon
								>
									<Input
										type="email"
										id="email"
										bind:value={formData.email}
										placeholder="john@example.com"
										required
										autocomplete="email"
										error={touched.email && !!errors.email}
										onblur={() => handleBlur('email')}
									/>
								</FormField>

								<FormField
									label="Phone Number"
									id="phone"
									icon={Phone}
									required
									hint="Format: +233 XXX XXX XXXX"
									error={touched.phone ? errors.phone : ''}
									valid={touched.phone && !errors.phone && !!formData.phone}
									showValidIcon
								>
									<Input
										type="tel"
										id="phone"
										bind:value={formData.phone}
										placeholder="+233 XXX XXX XXXX"
										required
										autocomplete="tel"
										error={touched.phone && !!errors.phone}
										oninput={handlePhoneInput}
										onblur={() => handleBlur('phone')}
									/>
								</FormField>
							</div>

							<FormField
								label="Home Address"
								id="address"
								icon={MapPin}
								required
								hint="Full address including area and city"
								error={touched.address ? errors.address : ''}
								valid={touched.address && !errors.address && !!formData.address}
								showValidIcon
							>
								<Textarea
									id="address"
									bind:value={formData.address}
									placeholder="123 Street Name, Area, Accra"
									required
									rows={3}
									error={touched.address && !!errors.address}
									onblur={() => handleBlur('address')}
								/>
							</FormField>
						</div>

						<!-- Additional Notes - Subtle -->
						<FormField
							label="Additional Notes"
							id="notes"
							icon={FileText}
						>
							{#snippet children()}
								<Textarea
									id="notes"
									bind:value={formData.notes}
									placeholder="Any specific requirements, medical conditions, or special requests we should know about..."
									rows={4}
									class="bg-gray-50 border-gray-200 focus:bg-white"
								/>
							{/snippet}
						</FormField>

						<!-- Submit Button - Prominent -->
						<div class="pt-8">
							<Button
								type="submit"
								variant="primary"
								size="lg"
								disabled={isSubmitting}
								loading={isSubmitting}
								class="w-full text-lg py-5 shadow-2xl shadow-emerald-600/30 hover:shadow-emerald-600/50"
							>
								{#snippet children()}
									{#if !isSubmitting}
										<CheckCircle2 class="h-6 w-6" />
										Complete Booking
									{:else}
										Processing Your Request...
									{/if}
								{/snippet}
								{#snippet icon()}
									{#if !isSubmitting}
										<ArrowRight class="h-6 w-6 transition-transform group-hover:translate-x-2" />
									{/if}
								{/snippet}
							</Button>
							<p class="mt-5 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
								<svg class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
								</svg>
								Your information is secure and will only be used for appointment confirmation
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced Info Section -->
<section class="py-24 bg-gradient-to-b from-white to-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-4xl">
			<div class="text-center mb-16">
				<h3 class="text-4xl font-bold text-gray-900 mb-4">What Happens Next?</h3>
				<p class="text-xl text-gray-600">Our simple 3-step booking process</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each BOOKING_SUCCESS_STEPS as { step, description }, index}
					<div class="relative group">
						<!-- Connection line (hidden on last item) -->
						{#if index < BOOKING_SUCCESS_STEPS.length - 1}
							<div class="hidden md:block absolute top-14 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-emerald-300 to-transparent"></div>
						{/if}

						<div class="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
							<div class="flex flex-col items-center text-center">
								<div class="relative mb-6">
									<div class="absolute inset-0 bg-emerald-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
									<div class="relative bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full h-16 w-16 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform">
										{step}
									</div>
								</div>
								<p class="text-gray-700 leading-relaxed font-medium">{description}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Trust indicators -->
			<div class="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
				<div class="flex items-center gap-2">
					<svg class="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
					</svg>
					<span class="font-medium">Licensed Professionals</span>
				</div>
				<div class="flex items-center gap-2">
					<svg class="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
					</svg>
					<span class="font-medium">24/7 Support</span>
				</div>
				<div class="flex items-center gap-2">
					<svg class="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
					</svg>
					<span class="font-medium">Secure & Confidential</span>
				</div>
			</div>
		</div>
	</div>
</section>
