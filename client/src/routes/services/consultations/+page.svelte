<script lang="ts">
	import { Stethoscope, Calendar, Clock, User, Mail, Phone, MapPin, FileText, ArrowRight, CheckCircle2, CheckCircle } from '@lucide/svelte';
	import { Hero, Button, Alert, FormField, Input, Select, Textarea } from '$lib';
	import { validateEmail, validatePhone, formatPhoneNumber, validateRequired, validateMinLength, validateSelect, convertTo24Hour, getTodayDate } from '$lib/utils/validation';
	import type { BookingPayload } from '$lib/types/forms';

	const CONSULTATION_SERVICES = [
		'General Health Consultation',
		'Follow-up Consultation',
		'Specialist Consultation (Orthopedics)'
	];

	const TIME_SLOTS = [
		'08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
		'12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
		'04:00 PM', '05:00 PM', '06:00 PM'
	];

	const features = [
		{ title: 'Expert Medical Advice', description: 'Professional consultation from qualified healthcare providers' },
		{ title: 'Comprehensive Assessments', description: 'Thorough evaluation of your health concerns and symptoms' },
		{ title: 'Personalized Treatment Plans', description: 'Customized recommendations based on your specific needs' },
		{ title: 'Flexible Scheduling', description: 'Convenient appointment times including evenings and weekends' }
	];

	let formData = $state({
		consultationType: '',
		appointmentDate: '',
		appointmentTime: '',
		fullName: '',
		email: '',
		phone: '',
		address: '',
		notes: ''
	});

	let errors = $state({
		consultationType: '',
		appointmentDate: '',
		appointmentTime: '',
		fullName: '',
		email: '',
		phone: '',
		address: ''
	});

	let touched = $state({
		consultationType: false,
		appointmentDate: false,
		appointmentTime: false,
		fullName: false,
		email: false,
		phone: false,
		address: false
	});

	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');

	const today = getTodayDate();

	function validateField(field: keyof typeof errors): void {
		switch (field) {
			case 'consultationType':
				errors.consultationType = validateSelect(formData.consultationType, 'a consultation type').error || '';
				break;
			case 'appointmentDate':
				errors.appointmentDate = validateRequired(formData.appointmentDate, 'appointment date').error || '';
				break;
			case 'appointmentTime':
				errors.appointmentTime = validateSelect(formData.appointmentTime, 'a time').error || '';
				break;
			case 'fullName':
				errors.fullName = validateMinLength(formData.fullName, 3, 'Full name').error || '';
				break;
			case 'email':
				errors.email = validateEmail(formData.email).error || '';
				break;
			case 'phone':
				errors.phone = validatePhone(formData.phone).error || '';
				break;
			case 'address':
				errors.address = validateMinLength(formData.address, 10, 'Home address').error || '';
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
		if (touched.phone) validateField('phone');
	}

	function validateAllFields(): boolean {
		const fields: (keyof typeof errors)[] = ['consultationType', 'appointmentDate', 'appointmentTime', 'fullName', 'email', 'phone', 'address'];
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
				service: `Consultation - ${formData.consultationType}`,
				dateTime: dateTime.toISOString(),
				contactDetails: {
					name: formData.fullName,
					email: formData.email,
					phone: formData.phone,
					address: formData.address
				},
				notes: formData.notes || undefined
			};

			const response = await fetch('/api/bookings', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(bookingData)
			});

			if (!response.ok) throw new Error('Failed to submit booking');

			submitSuccess = true;
			formData = { consultationType: '', appointmentDate: '', appointmentTime: '', fullName: '', email: '', phone: '', address: '', notes: '' };
			errors = { consultationType: '', appointmentDate: '', appointmentTime: '', fullName: '', email: '', phone: '', address: '' };
			touched = { consultationType: false, appointmentDate: false, appointmentTime: false, fullName: false, email: false, phone: false, address: false };
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			submitError = 'Unable to submit booking. Please try again or contact us directly.';
			console.error('Booking error:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Medical Consultations - SESI Healthcare</title>
	<meta name="description" content="Professional medical consultations including general health, follow-up visits, and specialist orthopedic consultations." />
</svelte:head>

<Hero
	title="Professional<br/><span class='text-emerald-400'>Medical Consultations</span>"
	subtitle="Expert healthcare consultations with qualified medical professionals for all your health needs"
	badge="Consultations"
	variant="gradient"
	decorative={true}
/>

<section class="py-20 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
				<div>
					<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm mb-6">
						<Stethoscope class="h-4 w-4" />
						Medical Consultations
					</div>
					<h2 class="text-4xl font-bold text-gray-900 mb-6">Expert Healthcare Consultations</h2>
					<p class="text-xl text-gray-600 mb-8 leading-relaxed">
						Connect with qualified healthcare professionals for comprehensive medical consultations. From general health assessments to specialist orthopedic care, we provide expert advice for your well-being.
					</p>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{#each features as feature}
						<div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-100 hover:border-emerald-200 transition-colors">
							<CheckCircle class="h-8 w-8 text-emerald-600 mb-4" />
							<h3 class="font-bold text-gray-900 mb-2">{feature.title}</h3>
							<p class="text-sm text-gray-600">{feature.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="relative py-28 overflow-hidden bg-gradient-to-b from-white to-gray-50">
	<div class="absolute top-20 right-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-20"></div>
	<div class="absolute bottom-20 left-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-20"></div>

	<div class="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
		<div class="mx-auto max-w-3xl">
			<div class="text-center mb-12">
				<h2 class="text-4xl font-bold text-gray-900 mb-4">Book Your Consultation</h2>
				<p class="text-xl text-gray-600">Fill out the form below and we'll contact you to confirm your appointment</p>
			</div>

			{#if submitSuccess}
				<Alert variant="success" title="Appointment Request Submitted!" message="We've received your request. Our team will contact you shortly to confirm your appointment details." class="mb-10" />
			{/if}

			{#if submitError}
				<Alert variant="error" title="Submission Error" message={submitError} class="mb-10" />
			{/if}

			<div class="relative group">
				<div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

				<div class="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 p-10">
					<form onsubmit={handleSubmit} class="space-y-8">
						<FormField label="Consultation Type" id="consultation-type" icon={Stethoscope} required error={touched.consultationType ? errors.consultationType : ''} valid={touched.consultationType && !errors.consultationType && !!formData.consultationType} showValidIcon>
							<Select id="consultation-type" bind:value={formData.consultationType} required error={touched.consultationType && !!errors.consultationType} placeholder="Select consultation type..." onblur={() => handleBlur('consultationType')}>
								{#each CONSULTATION_SERVICES as service}
									<option value={service}>{service}</option>
								{/each}
							</Select>
						</FormField>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<FormField label="Preferred Date" id="date" icon={Calendar} required error={touched.appointmentDate ? errors.appointmentDate : ''} valid={touched.appointmentDate && !errors.appointmentDate && !!formData.appointmentDate} showValidIcon>
								<Input type="date" id="date" bind:value={formData.appointmentDate} min={today} required error={touched.appointmentDate && !!errors.appointmentDate} onblur={() => handleBlur('appointmentDate')} />
							</FormField>

							<FormField label="Preferred Time" id="time" icon={Clock} required error={touched.appointmentTime ? errors.appointmentTime : ''} valid={touched.appointmentTime && !errors.appointmentTime && !!formData.appointmentTime} showValidIcon>
								<Select id="time" bind:value={formData.appointmentTime} required error={touched.appointmentTime && !!errors.appointmentTime} placeholder="Select time..." onblur={() => handleBlur('appointmentTime')}>
									{#each TIME_SLOTS as slot}
										<option value={slot}>{slot}</option>
									{/each}
								</Select>
							</FormField>
						</div>

						<div class="space-y-6 pt-6 border-t-2 border-gray-100">
							<FormField label="Full Name" id="name" icon={User} required error={touched.fullName ? errors.fullName : ''} valid={touched.fullName && !errors.fullName && !!formData.fullName} showValidIcon>
								<Input id="name" bind:value={formData.fullName} placeholder="John Doe" required autocomplete="name" error={touched.fullName && !!errors.fullName} onblur={() => handleBlur('fullName')} />
							</FormField>

							<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<FormField label="Email Address" id="email" icon={Mail} required hint="For appointment confirmation" error={touched.email ? errors.email : ''} valid={touched.email && !errors.email && !!formData.email} showValidIcon>
									<Input type="email" id="email" bind:value={formData.email} placeholder="john@example.com" required autocomplete="email" error={touched.email && !!errors.email} onblur={() => handleBlur('email')} />
								</FormField>

								<FormField label="Phone Number" id="phone" icon={Phone} required hint="+233 XXX XXX XXXX" error={touched.phone ? errors.phone : ''} valid={touched.phone && !errors.phone && !!formData.phone} showValidIcon>
									<Input type="tel" id="phone" bind:value={formData.phone} placeholder="+233 XXX XXX XXXX" required autocomplete="tel" error={touched.phone && !!errors.phone} oninput={handlePhoneInput} onblur={() => handleBlur('phone')} />
								</FormField>
							</div>

							<FormField label="Home Address" id="address" icon={MapPin} required hint="Where should we visit?" error={touched.address ? errors.address : ''} valid={touched.address && !errors.address && !!formData.address} showValidIcon>
								<Textarea id="address" bind:value={formData.address} placeholder="123 Street Name, Area, Accra" required rows={2} error={touched.address && !!errors.address} onblur={() => handleBlur('address')} />
							</FormField>
						</div>

						<FormField label="Additional Information" id="notes" icon={FileText} hint="Tell us about your symptoms, medical history, or concerns">
							{#snippet children()}
								<Textarea id="notes" bind:value={formData.notes} placeholder="Please describe your symptoms, current health concerns, relevant medical history, and any questions you have..." rows={4} class="bg-gray-50" />
							{/snippet}
						</FormField>

						<div class="pt-6">
							<Button type="submit" variant="primary" size="lg" disabled={isSubmitting} loading={isSubmitting} class="w-full text-lg py-5 shadow-2xl shadow-emerald-600/30 hover:shadow-emerald-600/50">
								{#snippet children()}
									{#if !isSubmitting}
										<CheckCircle2 class="h-6 w-6" />
										Request Appointment
									{:else}
										Processing...
									{/if}
								{/snippet}
								{#snippet icon()}
									{#if !isSubmitting}
										<ArrowRight class="h-6 w-6" />
									{/if}
								{/snippet}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>
