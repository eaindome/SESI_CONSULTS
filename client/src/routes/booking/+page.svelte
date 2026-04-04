<script lang="ts">
	import { Calendar, Clock, User, Mail, Phone, MapPin, FileText } from '@lucide/svelte';
	import { bookingSchema } from '$lib/utils/validation';
	import { toasts } from '$lib/stores/toasts';
	import Button from '$lib/components/ui/Button.svelte';
	import CustomSelect from '$lib/components/ui/CustomSelect.svelte';
	import DatePicker from '$lib/components/ui/DatePicker.svelte';

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
	let errors = $state<Record<string, string>>({});

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

	async function handleSubmit(e: Event) {
		e.preventDefault();
		errors = {};

		// Validate form data with Zod
		const formData = {
			service: selectedService,
			date: appointmentDate,
			time: appointmentTime,
			fullName,
			email,
			phone,
			address,
			notes: notes || undefined
		};

		const validation = bookingSchema.safeParse(formData);

		if (!validation.success) {
			validation.error.issues.forEach(err => {
				const field = err.path[0] as string;
				errors[field] = err.message;
			});
			toasts.error('Please fix the errors in the form');
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

			toasts.success('Booking submitted successfully! We\'ll contact you shortly to confirm.');

			// Reset form
			selectedService = '';
			appointmentDate = '';
			appointmentTime = '';
			fullName = '';
			email = '';
			phone = '';
			address = '';
			notes = '';
			errors = {};

			// Scroll to top
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			toasts.error('Unable to submit booking. Please try again or contact us directly.');
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
	<title>Book an Appointment - SES Homecare & Medical Supplies</title>
	<meta name="description" content="Schedule your home healthcare appointment online. Choose your service, date, and time." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-linear-to-br from-[#1a5f4a] to-[#0d3d2d] py-24 sm:py-32">
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
		<div class="mx-auto max-w-3xl text-center">
			<div class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 animate-fade-in">
				Book Now
			</div>
			<h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 animate-fade-in-up">
				Schedule Your Home Care Visit
			</h1>
			<p class="text-xl text-white/90 leading-relaxed animate-fade-in" style="animation-delay: 0.2s;">
				Choose a convenient time for professional healthcare delivered to your doorstep
			</p>
		</div>
	</div>
</section>

<!-- Booking Form -->
<section class="py-16 md:py-24 bg-linear-to-b from-white to-gray-50/50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-2xl">
			<!-- Section title -->
			<div class="text-center mb-10">
				<div class="inline-block px-4 py-1.5 bg-[#1a5f4a]/10 text-[#1a5f4a] text-sm font-semibold rounded-full mb-4">
					Appointment Request
				</div>
				<h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Book Your Home Visit</h2>
				<p class="text-lg text-gray-600">
					Fill in the details below and we'll confirm your appointment within a few hours.
				</p>
			</div>
			<!-- Form Card with enhanced styling -->
			<div class="relative">
				<form onsubmit={handleSubmit} class="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 space-y-8">
					<!-- Service Selection -->
					<div class="group">
						<label for="service" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
							<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
								<FileText class="h-4 w-4 text-[#1a5f4a]" />
							</div>
							Select Service
						</label>
						<CustomSelect
							id="service"
							bind:value={selectedService}
							options={services}
							placeholder="Choose a service..."
						/>
						{#if errors.service}
							<p class="mt-2 text-sm text-red-600 flex items-center">
								<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
								</svg>
								{errors.service}
							</p>
						{/if}
					</div>

					<!-- Date & Time -->
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div class="group">
							<label for="date" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
								<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
									<Calendar class="h-4 w-4 text-[#1a5f4a]" />
								</div>
								Date
							</label>
							<DatePicker
								id="date"
								bind:value={appointmentDate}
								min={today}
								placeholder="Choose a date..."
							/>
						</div>

						<div class="group">
							<label for="time" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
								<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
									<Clock class="h-4 w-4 text-[#1a5f4a]" />
								</div>
								Time
							</label>
							<CustomSelect
								id="time"
								bind:value={appointmentTime}
								options={timeSlots}
								placeholder="Select time..."
							/>
						</div>
					</div>

					<!-- Contact Details Section -->
					<div class="pt-6 pb-2">
						<div class="flex items-center mb-8">
							<div class="h-0.5 flex-1 bg-linear-to-r from-transparent via-[#4caf50]/20 to-transparent"></div>
							<h3 class="text-lg font-bold text-gray-900 px-5">Contact Information</h3>
							<div class="h-0.5 flex-1 bg-linear-to-r from-transparent via-[#4caf50]/20 to-transparent"></div>
						</div>

						<div class="space-y-6">
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
									class="w-full rounded-2xl bg-gray-50 hover:bg-gray-100 focus:bg-white px-5 py-4 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg border-0"
								/>
							</div>

							<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div class="group">
									<label for="email" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
										<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
											<Mail class="h-4 w-4 text-[#1a5f4a]" />
										</div>
										Email
									</label>
									<input
										type="email"
										id="email"
										bind:value={email}
										required
										placeholder="john@example.com"
										class="w-full rounded-2xl {errors.email ? 'bg-red-50 shadow-red-100' : 'bg-gray-50 hover:bg-gray-100 focus:bg-white'} px-5 py-4 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg border-0"
									/>
									{#if errors.email}
										<p class="mt-2 text-sm text-red-600 flex items-center">
											<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
											</svg>
											{errors.email}
										</p>
									{/if}
								</div>

								<div class="group">
									<label for="phone" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
										<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
											<Phone class="h-4 w-4 text-[#1a5f4a]" />
										</div>
										Phone Number
									</label>
									<input
										type="tel"
										id="phone"
										bind:value={phone}
										required
										placeholder="+233 XXX XXX XXXX"
										class="w-full rounded-2xl bg-gray-50 hover:bg-gray-100 focus:bg-white px-5 py-4 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg border-0"
									/>
								</div>
							</div>

							<div class="group">
								<label for="address" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
									<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
										<MapPin class="h-4 w-4 text-[#1a5f4a]" />
									</div>
									Home Address
								</label>
								<textarea
									id="address"
									bind:value={address}
									required
									rows="2"
									placeholder="123 Street Name, Area, Accra"
									class="w-full rounded-2xl bg-gray-50 hover:bg-gray-100 focus:bg-white px-5 py-4 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg resize-none border-0"
								></textarea>
							</div>
						</div>
					</div>

					<!-- Additional Notes -->
					<div class="group">
						<label for="notes" class="mb-3 flex items-center text-sm font-semibold text-gray-900">
							<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3 group-focus-within:bg-[#1a5f4a]/20 transition-colors">
								<FileText class="h-4 w-4 text-[#1a5f4a]" />
							</div>
							Additional Notes <span class="text-gray-500 font-normal ml-1">(Optional)</span>
						</label>
						<textarea
							id="notes"
							bind:value={notes}
							rows="4"
							placeholder="Any specific requirements or information we should know..."
							class="w-full rounded-2xl bg-gray-50 hover:bg-gray-100 focus:bg-white px-5 py-4 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg resize-none border-0"
						></textarea>
					</div>

					<!-- Submit Button -->
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
							Book Appointment
							<svg slot="icon" class="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</Button>
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
					<div class="shrink-0 rounded-full bg-[#1a5f4a] h-10 w-10 flex items-center justify-center text-white font-bold">
						1
					</div>
					<p class="text-gray-600 pt-1.5">We receive your booking request</p>
				</div>
				<div class="flex gap-3 items-start">
					<div class="shrink-0 rounded-full bg-[#1a5f4a] h-10 w-10 flex items-center justify-center text-white font-bold">
						2
					</div>
					<p class="text-gray-600 pt-1.5">Our team contacts you to confirm details</p>
				</div>
				<div class="flex gap-3 items-start">
					<div class="shrink-0 rounded-full bg-[#1a5f4a] h-10 w-10 flex items-center justify-center text-white font-bold">
						3
					</div>
					<p class="text-gray-600 pt-1.5">Your nurse arrives at the scheduled time</p>
				</div>
			</div>
		</div>
	</div>
</section>
