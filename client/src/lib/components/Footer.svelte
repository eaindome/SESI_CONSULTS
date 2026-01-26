<script lang="ts">
	import { Mail, Phone, MapPin } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();

	const footerLinks = {
		company: [
			{ label: 'About Us', href: '/about' },
			{ label: 'Our Services', href: '/services' },
			{ label: 'Meet the Team', href: '/team' }
		],
		support: [
			{ label: 'Contact Us', href: '/contact' },
			{ label: 'Book Appointment', href: '/booking' },
			{ label: 'FAQs', href: '/contact#faqs' }
		]
	};
</script>

<footer class="border-t border-gray-200 bg-gray-50">
	<div class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Brand -->
			<div class="lg:col-span-2">
				<div class="flex items-center space-x-2 mb-4">
					<div class="h-8 w-8 rounded-lg bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center">
						<span class="text-white font-bold text-lg">S</span>
					</div>
					<span class="font-semibold text-lg text-gray-900">SESI Healthcare</span>
				</div>
				<p class="text-sm text-gray-600 max-w-md mb-6">
					Professional home healthcare services delivered with compassion and excellence.
					Your health and comfort are our priority.
				</p>
				<div class="space-y-3 text-sm text-gray-600">
					<div class="flex items-start space-x-2">
						<MapPin class="h-4 w-4 mt-0.5 text-teal-600 shrink-0" />
						<span>Accra, Ghana</span>
					</div>
					<div class="flex items-center space-x-2">
						<Phone class="h-4 w-4 text-teal-600 shrink-0" />
						<span>+233 XXX XXX XXXX</span>
					</div>
					<div class="flex items-center space-x-2">
						<Mail class="h-4 w-4 text-teal-600 shrink-0" />
						<span>info@sesihealthcare.com</span>
					</div>
				</div>
			</div>

			<!-- Company Links -->
			<div>
				<h3 class="font-semibold text-gray-900 mb-4">Company</h3>
				<ul class="space-y-3">
					{#each footerLinks.company as link}
						<li>
							<a
								href={link.href}
								class="text-sm text-gray-600 hover:text-teal-600 transition-colors"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Support Links -->
			<div>
				<h3 class="font-semibold text-gray-900 mb-4">Support</h3>
				<ul class="space-y-3">
					{#each footerLinks.support as link}
						<li>
							<a
								href={link.href}
								class="text-sm text-gray-600 hover:text-teal-600 transition-colors"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-12 border-t border-gray-200 pt-8">
			<p class="text-sm text-gray-500 text-center">
				&copy; {currentYear} SESI Healthcare. All rights reserved.
			</p>
		</div>
	</div>
</footer>
