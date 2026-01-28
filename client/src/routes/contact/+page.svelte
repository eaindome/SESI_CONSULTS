<script lang="ts">
	import { Mail, Phone, MapPin, Clock } from '@lucide/svelte';
	import { Hero } from '$lib';

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

<Hero
	title="We're Here to <br/>Help You"
	subtitle="Have questions about our services? Reach out to our team and we'll get back to you promptly."
	badge="Contact Us"
	variant="gradient"
	decorative={false}
/>

<!-- Contact Info -->
<section class="py-24 bg-white">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-xl bg-emerald-100 p-4 text-emerald-600">
					<Phone class="h-7 w-7" />
				</div>
				<div>
					<h3 class="mb-2 font-bold text-gray-900 text-lg">Phone</h3>
					<p class="text-gray-600 mb-1">+233 XXX XXX XXXX</p>
					<p class="text-sm text-gray-500">Mon-Sun, 24/7</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-xl bg-emerald-100 p-4 text-emerald-600">
					<Mail class="h-7 w-7" />
				</div>
				<div>
					<h3 class="mb-2 font-bold text-gray-900 text-lg">Email</h3>
					<p class="text-gray-600 mb-1">info@sesihealthcare.com</p>
					<p class="text-sm text-gray-500">We reply within 24 hours</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-xl bg-emerald-100 p-4 text-emerald-600">
					<MapPin class="h-7 w-7" />
				</div>
				<div>
					<h3 class="mb-2 font-bold text-gray-900 text-lg">Location</h3>
					<p class="text-gray-600 mb-1">Accra, Ghana</p>
					<p class="text-sm text-gray-500">Serving Accra & environs</p>
				</div>
			</div>

			<div class="flex gap-4 items-start">
				<div class="shrink-0 rounded-xl bg-emerald-100 p-4 text-emerald-600">
					<Clock class="h-7 w-7" />
				</div>
				<div>
					<h3 class="mb-2 font-bold text-gray-900 text-lg">Availability</h3>
					<p class="text-gray-600 mb-1">24/7 Service</p>
					<p class="text-sm text-gray-500">Including holidays</p>
				</div>
			</div>
		</div>

		<div class="mt-20 max-w-3xl mx-auto">
			<div class="rounded-2xl bg-emerald-600 p-10 text-center">
				<h3 class="text-2xl font-bold text-white mb-4">Ready to Book?</h3>
				<p class="text-emerald-50 mb-8 text-lg">
					Skip the wait and schedule your appointment online in just a few minutes.
				</p>
				<a
					href="/booking"
					class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
				>
					Book an Appointment
					<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- FAQs Section -->
<section id="faqs" class="py-24 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
				<p class="text-xl text-gray-600">
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
							aria-expanded={openFaq === index}
							aria-controls="faq-answer-{index}"
							id="faq-question-{index}"
						>
							<span class="font-medium text-gray-900">{faq.question}</span>
							<svg
								class="h-5 w-5 shrink-0 text-gray-500 transition-transform {openFaq === index ? 'rotate-180' : ''}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						{#if openFaq === index}
							<div class="px-6 pb-4" id="faq-answer-{index}" role="region" aria-labelledby="faq-question-{index}">
								<p class="text-gray-600">{faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class="mt-12 text-center">
				<p class="text-gray-600">
					Still have questions?
					<a href="mailto:info@sesihealthcare.com" class="text-emerald-600 hover:text-emerald-700 font-medium">
						Contact us directly
					</a>
				</p>
			</div>
		</div>
	</div>
</section>
