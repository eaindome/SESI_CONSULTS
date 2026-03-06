<script lang="ts">
	import { Mail, Phone, MapPin } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();

	const footerLinks = {
		company: [
			{ label: 'About Us', href: '/about' },
			{ label: 'Our Services', href: '/services' },
			{ label: 'Meet the Team', href: '/about#team' }
		],
		support: [
			{ label: 'Contact Us', href: '/contact' },
			{ label: 'Book Appointment', href: '/booking' },
			{ label: 'FAQs', href: '/contact#faqs' }
		]
	};
</script>

<footer class="border-t border-gray-100 bg-[#f5f5f5]">
	<div class="container mx-auto px-6 py-16 sm:px-8 lg:px-12">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
			<!-- Brand -->
			<div class="lg:col-span-2">
				<div class="flex items-center space-x-3 mb-6">
					<img src="/images/logo/logo_trans_background.png" alt="SESI Homecare logo" class="h-12 w-12 rounded-xl object-contain" />
					<div class="flex flex-col leading-tight">
						<span class="font-bold text-2xl text-gray-900 leading-none">SESI Homecare</span>
						<span class="text-sm text-[#1a5f4a] font-medium tracking-wide">Medical Supplies &amp; Services</span>
					</div>
				</div>
				<p class="text-base text-gray-600 max-w-md mb-8 leading-relaxed">
					Professional home healthcare services delivered with compassion and excellence.
					Your health and comfort are our priority.
				</p>
				<div class="space-y-3">
					<div class="flex items-start space-x-3">
						<MapPin class="h-5 w-5 mt-0.5 text-[#1a5f4a] shrink-0" />
						<span class="text-gray-700">Accra, Ghana</span>
					</div>
					<div class="flex items-center space-x-3">
						<Phone class="h-5 w-5 text-[#1a5f4a] shrink-0" />
						<span class="text-gray-700">0246028223</span>
					</div>
					<div class="flex items-center space-x-3">
						<Mail class="h-5 w-5 text-[#1a5f4a] shrink-0" />
						<span class="text-gray-700 break-all">seshomecareandmedicalsupplies@gmail.com</span>
					</div>
				</div>
			</div>

			<!-- Company Links -->
			<div>
				<h3 class="font-bold text-gray-900 mb-6">Company</h3>
				<ul class="space-y-3">
					{#each footerLinks.company as link (link.label ?? link.href)}
						<li>
							<a
								href={link.href}
								class="text-base text-gray-600 hover:text-[#1a5f4a] transition-colors"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Support Links -->
			<div>
				<h3 class="font-bold text-gray-900 mb-6">Support</h3>
				<ul class="space-y-3">
					{#each footerLinks.support as link (link.label ?? link.href)}
						<li>
							<a
								href={link.href}
								class="text-base text-gray-600 hover:text-[#1a5f4a] transition-colors"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-16 border-t border-gray-200 pt-8">
			<p class="text-sm text-gray-500 text-center">
				&copy; {currentYear} SESI Homecare & Medical Supplies. All rights reserved.
			</p>
		</div>
	</div>
</footer>
