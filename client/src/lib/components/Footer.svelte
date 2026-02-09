<script lang="ts">
	import { Mail, Phone, MapPin } from '@lucide/svelte';
	import Logo from './Logo.svelte';

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

<footer class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-colors">
	<div class="container mx-auto px-6 py-16 sm:px-8 lg:px-12">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
			<!-- Brand -->
			<div class="lg:col-span-2">
				<div class="mb-6">
					<Logo variant="symbol" size="md" />
				</div>
				<p class="text-base text-gray-600 dark:text-gray-400 max-w-md mb-8 leading-relaxed transition-colors">
					Professional home healthcare services delivered with compassion and excellence.
					Your health and comfort are our priority.
				</p>
				<div class="space-y-3">
					<div class="flex items-start space-x-3">
						<MapPin class="h-5 w-5 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0 transition-colors" />
						<span class="text-gray-700 dark:text-gray-300 transition-colors">Accra, Ghana</span>
					</div>
					<div class="flex items-center space-x-3">
						<Phone class="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 transition-colors" />
						<span class="text-gray-700 dark:text-gray-300 transition-colors">+233 XXX XXX XXXX</span>
					</div>
					<div class="flex items-center space-x-3">
						<Mail class="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 transition-colors" />
						<span class="text-gray-700 dark:text-gray-300 transition-colors">info@sesihealthcare.com</span>
					</div>
				</div>
			</div>

			<!-- Company Links -->
			<div>
				<h3 class="font-bold text-gray-900 dark:text-white mb-6 transition-colors">Company</h3>
				<ul class="space-y-3">
					{#each footerLinks.company as link}
						<li>
							<a
								href={link.href}
								class="text-base text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Support Links -->
			<div>
				<h3 class="font-bold text-gray-900 dark:text-white mb-6 transition-colors">Support</h3>
				<ul class="space-y-3">
					{#each footerLinks.support as link}
						<li>
							<a
								href={link.href}
								class="text-base text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 transition-colors">
			<p class="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors">
				&copy; {currentYear} SESI Healthcare. All rights reserved.
			</p>
		</div>
	</div>
</footer>
