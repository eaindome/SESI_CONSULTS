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

<footer class="border-t border-emerald-100 bg-gradient-to-br from-gray-50 to-emerald-50/30">
	<div class="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
			<!-- Brand -->
			<div class="lg:col-span-2">
				<div class="flex items-center space-x-3 mb-6">
					<div class="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-md">
						<span class="text-white font-bold text-xl">S</span>
					</div>
					<span class="font-bold text-xl text-gray-900">SESI Healthcare</span>
				</div>
				<p class="text-base text-gray-600 max-w-md mb-8 leading-relaxed">
					Professional home healthcare services delivered with compassion and excellence.
					Your health and comfort are our priority.
				</p>
				<div class="space-y-4">
					<div class="flex items-start space-x-3 group">
						<MapPin class="h-5 w-5 mt-0.5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
						<span class="text-gray-700">Accra, Ghana</span>
					</div>
					<div class="flex items-center space-x-3 group">
						<Phone class="h-5 w-5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
						<span class="text-gray-700">+233 XXX XXX XXXX</span>
					</div>
					<div class="flex items-center space-x-3 group">
						<Mail class="h-5 w-5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
						<span class="text-gray-700">info@sesihealthcare.com</span>
					</div>
				</div>
			</div>

			<!-- Company Links -->
			<div>
				<h3 class="font-bold text-gray-900 mb-6 text-lg">Company</h3>
				<ul class="space-y-3">
					{#each footerLinks.company as link}
						<li>
							<a
								href={link.href}
								class="text-base text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:translate-x-1 inline-block"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Support Links -->
			<div>
				<h3 class="font-bold text-gray-900 mb-6 text-lg">Support</h3>
				<ul class="space-y-3">
					{#each footerLinks.support as link}
						<li>
							<a
								href={link.href}
								class="text-base text-gray-600 hover:text-emerald-600 transition-all duration-300 hover:translate-x-1 inline-block"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-16 border-t border-emerald-200 pt-8">
			<p class="text-sm text-gray-500 text-center">
				&copy; {currentYear} SESI Healthcare. All rights reserved.
			</p>
		</div>
	</div>
</footer>
