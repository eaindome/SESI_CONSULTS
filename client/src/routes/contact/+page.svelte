<script lang="ts">
	import { Mail, Phone, MapPin, Clock } from '@lucide/svelte';

	const faqs = [
		{
			question: 'What areas do you serve?',
			answer: 'We currently provide home healthcare services throughout Accra and surrounding areas. Contact us to confirm if we serve your specific location.'
		},
		{
			question: 'Are your nurses licensed and insured?',
			answer: 'Yes, all our healthcare professionals are fully licensed, certified, insured, and have undergone comprehensive background checks.'
		},
		{
			question: 'How far in advance should I book?',
			answer: 'We recommend booking at least 24-48 hours in advance. However, we do accommodate urgent requests when possible. Contact us directly for urgent care needs.'
		},
		{
			question: 'What should I prepare before the nurse arrives?',
			answer: 'Ensure you have any relevant medical records, current medications list, and insurance information ready. Create a comfortable space for the care session.'
		},
		{
			question: 'Can I request a specific nurse?',
			answer: 'Yes, if you\'ve worked with one of our nurses before and would like to request them for future appointments, please let us know when booking.'
		},
		{
			question: 'What is your cancellation policy?',
			answer: 'We require at least 24 hours notice for cancellations. This allows us to reschedule and serve other patients effectively.'
		},
		{
			question: 'Do you accept insurance?',
			answer: 'We work with several insurance providers. Please contact us with your insurance details to verify coverage.'
		},
		{
			question: 'What if I need care outside regular hours?',
			answer: 'We offer 24/7 availability for urgent care needs. Contact our emergency line for after-hours assistance.'
		}
	];

	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}
</script>

<svelte:head>
	<title>Contact Us - SESI Healthcare</title>
	<meta name="description" content="Get in touch with SESI Healthcare. We're here to answer your questions and help you book home healthcare services." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-linear-to-br from-teal-50 to-blue-50 py-16 sm:py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
				Get in Touch
			</h1>
			<p class="mt-6 text-lg text-gray-600">
				Have questions? We're here to help you get the care you need.
			</p>
		</div>
	</div>
</section>

<!-- Contact Info -->
<section class="py-16 bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
			<div class="text-center">
				<div class="mb-4 inline-flex items-center justify-center rounded-full bg-teal-100 p-4 text-teal-600">
					<Phone class="h-6 w-6" />
				</div>
				<h3 class="mb-2 font-semibold text-gray-900">Phone</h3>
				<p class="text-gray-600">+234 XXX XXX XXXX</p>
				<p class="text-sm text-gray-500 mt-1">Mon-Sun, 24/7</p>
			</div>

			<div class="text-center">
				<div class="mb-4 inline-flex items-center justify-center rounded-full bg-teal-100 p-4 text-teal-600">
					<Mail class="h-6 w-6" />
				</div>
				<h3 class="mb-2 font-semibold text-gray-900">Email</h3>
				<p class="text-gray-600">info@sesihealthcare.com</p>
				<p class="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
			</div>

			<div class="text-center">
				<div class="mb-4 inline-flex items-center justify-center rounded-full bg-teal-100 p-4 text-teal-600">
					<MapPin class="h-6 w-6" />
				</div>
				<h3 class="mb-2 font-semibold text-gray-900">Location</h3>
				<p class="text-gray-600">Accra, Ghana</p>
				<p class="text-sm text-gray-500 mt-1">Serving Accra & environs</p>
			</div>

			<div class="text-center">
				<div class="mb-4 inline-flex items-center justify-center rounded-full bg-teal-100 p-4 text-teal-600">
					<Clock class="h-6 w-6" />
				</div>
				<h3 class="mb-2 font-semibold text-gray-900">Availability</h3>
				<p class="text-gray-600">24/7 Service</p>
				<p class="text-sm text-gray-500 mt-1">Including holidays</p>
			</div>
		</div>

		<div class="mt-16 max-w-2xl mx-auto">
			<div class="rounded-xl border border-teal-200 bg-teal-50 p-8 text-center">
				<h3 class="text-xl font-semibold text-gray-900 mb-3">Ready to Book?</h3>
				<p class="text-gray-600 mb-6">
					Skip the wait and schedule your appointment online in just a few minutes.
				</p>
				<a
					href="/booking"
					class="inline-flex items-center justify-center rounded-lg bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 transition-colors"
				>
					Book an Appointment
				</a>
			</div>
		</div>
	</div>
</section>

<!-- FAQs Section -->
<section id="faqs" class="py-16 bg-gray-50">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
				<p class="mt-4 text-lg text-gray-600">
					Find answers to common questions about our services
				</p>
			</div>

			<div class="space-y-4">
				{#each faqs as faq, index}
					<div class="rounded-lg border border-gray-200 bg-white overflow-hidden">
						<button
							type="button"
							class="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
							onclick={() => toggleFaq(index)}
						>
							<span class="font-medium text-gray-900">{faq.question}</span>
							<svg
								class="h-5 w-5 shrink-0 text-gray-500 transition-transform {openFaq === index ? 'rotate-180' : ''}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						{#if openFaq === index}
							<div class="px-6 pb-4">
								<p class="text-gray-600">{faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class="mt-12 text-center">
				<p class="text-gray-600">
					Still have questions?
					<a href="mailto:info@sesihealthcare.com" class="text-teal-600 hover:text-teal-700 font-medium">
						Contact us directly
					</a>
				</p>
			</div>
		</div>
	</div>
</section>
