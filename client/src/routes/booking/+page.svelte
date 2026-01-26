<script lang="ts">
	import { Calendar, Clock, User, Mail, Phone, MapPin, FileText } from '@lucide/svelte';

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
		isSubmitting = true;
		submitError = '';
		submitSuccess = false;

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

<!-- Hero Section -->
<section class="bg-linear-to-br from-teal-50 to-blue-50 py-16 sm:py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
				Book Your Appointment
			</h1>
			<p class="mt-6 text-lg text-gray-600">
				Schedule quality healthcare in the comfort of your home
			</p>
		</div>
	</div>
</section>

<!-- Booking Form -->
<section class="py-16 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl">
			{#if submitSuccess}
				<div class="mb-8 rounded-lg border border-teal-200 bg-teal-50 p-6">
					<div class="flex items-start">
						<svg class="h-6 w-6 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div class="ml-3">
							<h3 class="font-semibold text-teal-900">Booking Submitted Successfully!</h3>
							<p class="mt-2 text-sm text-teal-700">
								We've received your appointment request. Our team will contact you shortly to confirm the details.
							</p>
						</div>
					</div>
				</div>
			{/if}

			{#if submitError}
				<div class="mb-8 rounded-lg border border-red-200 bg-red-50 p-6">
					<div class="flex items-start">
						<svg class="h-6 w-6 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div class="ml-3">
							<h3 class="font-semibold text-red-900">Error</h3>
							<p class="mt-2 text-sm text-red-700">{submitError}</p>
						</div>
					</div>
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="space-y-8">
				<!-- Service Selection -->
				<div>
					<label for="service" class="mb-2 flex items-center text-sm font-medium text-gray-900">
						<FileText class="mr-2 h-4 w-4 text-teal-600" />
						Select Service
					</label>
					<select
						id="service"
						bind:value={selectedService}
						required
						class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
					>
						<option value="">Choose a service...</option>
						{#each services as service}
							<option value={service}>{service}</option>
						{/each}
					</select>
				</div>

				<!-- Date & Time -->
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div>
						<label for="date" class="mb-2 flex items-center text-sm font-medium text-gray-900">
							<Calendar class="mr-2 h-4 w-4 text-teal-600" />
							Date
						</label>
						<input
							type="date"
							id="date"
							bind:value={appointmentDate}
							min={today}
							required
							class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
						/>
					</div>

					<div>
						<label for="time" class="mb-2 flex items-center text-sm font-medium text-gray-900">
							<Clock class="mr-2 h-4 w-4 text-teal-600" />
							Time
						</label>
						<select
							id="time"
							bind:value={appointmentTime}
							required
							class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
						>
							<option value="">Select time...</option>
							{#each timeSlots as slot}
								<option value={slot}>{slot}</option>
							{/each}
						</select>
					</div>
				</div>

				<!-- Contact Details -->
				<div class="space-y-6">
					<h3 class="text-lg font-semibold text-gray-900">Contact Information</h3>

					<div>
						<label for="name" class="mb-2 flex items-center text-sm font-medium text-gray-900">
							<User class="mr-2 h-4 w-4 text-teal-600" />
							Full Name
						</label>
						<input
							type="text"
							id="name"
							bind:value={fullName}
							required
							placeholder="John Doe"
							class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
						/>
					</div>

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label for="email" class="mb-2 flex items-center text-sm font-medium text-gray-900">
								<Mail class="mr-2 h-4 w-4 text-teal-600" />
								Email
							</label>
							<input
								type="email"
								id="email"
								bind:value={email}
								required
								placeholder="john@example.com"
								class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
							/>
						</div>

						<div>
							<label for="phone" class="mb-2 flex items-center text-sm font-medium text-gray-900">
								<Phone class="mr-2 h-4 w-4 text-teal-600" />
								Phone Number
							</label>
							<input
								type="tel"
								id="phone"
								bind:value={phone}
								required
								placeholder="+234 XXX XXX XXXX"
								class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
							/>
						</div>
					</div>

					<div>
						<label for="address" class="mb-2 flex items-center text-sm font-medium text-gray-900">
							<MapPin class="mr-2 h-4 w-4 text-teal-600" />
							Home Address
						</label>
						<textarea
							id="address"
							bind:value={address}
							required
							rows="2"
							placeholder="123 Street Name, Area, Accra"
							class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
						></textarea>
					</div>
				</div>

				<!-- Additional Notes -->
				<div>
					<label for="notes" class="mb-2 flex items-center text-sm font-medium text-gray-900">
						<FileText class="mr-2 h-4 w-4 text-teal-600" />
						Additional Notes (Optional)
					</label>
					<textarea
						id="notes"
						bind:value={notes}
						rows="4"
						placeholder="Any specific requirements or information we should know..."
						class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
					></textarea>
				</div>

				<!-- Submit Button -->
				<div class="pt-4">
					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full rounded-lg bg-teal-600 px-8 py-4 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
					>
						{isSubmitting ? 'Submitting...' : 'Book Appointment'}
					</button>
					<p class="mt-4 text-center text-sm text-gray-500">
						By submitting, you agree to our terms of service and privacy policy.
					</p>
				</div>
			</form>
		</div>
	</div>
</section>

<!-- Info Section -->
<section class="py-12 bg-gray-50">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h3 class="text-xl font-semibold text-gray-900 mb-4">What Happens Next?</h3>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
				<div>
					<div class="mb-2 inline-flex items-center justify-center rounded-full bg-teal-100 h-10 w-10 text-teal-600 font-bold">
						1
					</div>
					<p class="text-gray-600">We receive your booking request</p>
				</div>
				<div>
					<div class="mb-2 inline-flex items-center justify-center rounded-full bg-teal-100 h-10 w-10 text-teal-600 font-bold">
						2
					</div>
					<p class="text-gray-600">Our team contacts you to confirm details</p>
				</div>
				<div>
					<div class="mb-2 inline-flex items-center justify-center rounded-full bg-teal-100 h-10 w-10 text-teal-600 font-bold">
						3
					</div>
					<p class="text-gray-600">Your nurse arrives at the scheduled time</p>
				</div>
			</div>
		</div>
	</div>
</section>
