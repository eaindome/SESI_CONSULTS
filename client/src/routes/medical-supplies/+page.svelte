<script lang="ts">
	import { Wheelchair, Stethoscope, Syringe, Package, Droplet, TestTube2, Sparkles, Activity, ShoppingBag } from '@lucide/svelte';
	import { Hero } from '$lib';
	import { inquiryCart } from '$lib/stores/inquiryCart.svelte';

	const productCategories = [
		{
			id: 'mobility',
			icon: Wheelchair,
			name: 'Mobility & Accessibility Aids',
			description: 'Equipment to support movement and independence',
			products: [
				{ id: 'wheelchair-manual', name: 'Manual Wheelchair', image: 'https://images.unsplash.com/photo-1638913662252-70efce1e60a7?w=400&h=400&fit=crop&q=80' },
				{ id: 'wheelchair-electric', name: 'Electric Wheelchair', image: 'https://images.unsplash.com/photo-1638913658159-5f3c3f25dbde?w=400&h=400&fit=crop&q=80' },
				{ id: 'hospital-bed-manual', name: 'Hospital Bed (Manual)', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=400&fit=crop&q=80' },
				{ id: 'hospital-bed-electric', name: 'Hospital Bed (Electric)', image: 'https://images.unsplash.com/photo-1598300188058-fb1c04dd5843?w=400&h=400&fit=crop&q=80' },
				{ id: 'walker-adjustable', name: 'Adjustable Walker', image: 'https://images.unsplash.com/photo-1615485020441-69e57b587fb0?w=400&h=400&fit=crop&q=80' },
				{ id: 'rollator', name: 'Rollator', image: 'https://images.unsplash.com/photo-1615485020615-f0e8c3cb2937?w=400&h=400&fit=crop&q=80' },
				{ id: 'crutches', name: 'Crutches', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80' },
				{ id: 'canes', name: 'Walking Canes', image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop&q=80' },
				{ id: 'transfer-board', name: 'Patient Transfer Board', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop&q=80' },
				{ id: 'slide-sheet', name: 'Slide Sheet', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=400&fit=crop&q=80' },
				{ id: 'exam-table', name: 'Examination Table', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=400&fit=crop&q=80' },
				{ id: 'exam-stool', name: 'Examination Stool', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop&q=80' },
				{ id: 'overbed-table', name: 'Over-bed Table', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=400&fit=crop&q=80' },
				{ id: 'mobility-scooter', name: 'Mobility Scooter', image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&h=400&fit=crop&q=80' },
				{ id: 'patient-lift', name: 'Patient Lift/Hoist', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=400&fit=crop&q=80' }
			]
		},
		{
			id: 'respiratory',
			icon: Activity,
			name: 'Respiratory & Monitoring Equipment',
			description: 'Devices for breathing support and health monitoring',
			products: [
				{ id: 'nebulizer', name: 'Nebulizer Machine', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop&q=80' },
				{ id: 'oxygen-concentrator', name: 'Oxygen Concentrator', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'cpap-machine', name: 'CPAP Machine', image: 'https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=400&h=400&fit=crop&q=80' },
				{ id: 'bipap-machine', name: 'BiPAP Machine', image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400&h=400&fit=crop&q=80' },
				{ id: 'pulse-oximeter', name: 'Pulse Oximeter', image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop&q=80' },
				{ id: 'bp-monitor-digital', name: 'Blood Pressure Monitor (Digital)', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop&q=80' },
				{ id: 'bp-monitor-manual', name: 'Blood Pressure Monitor (Manual)', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop&q=80' },
				{ id: 'stethoscope', name: 'Stethoscope', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80' },
				{ id: 'thermometer-digital', name: 'Digital Thermometer', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&h=400&fit=crop&q=80' },
				{ id: 'thermometer-infrared', name: 'Infrared Thermometer', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' }
			]
		},
		{
			id: 'instruments',
			icon: Stethoscope,
			name: 'Medical Instruments & Diagnostic Tools',
			description: 'Professional medical instruments and examination tools',
			products: [
				{ id: 'medical-scissors', name: 'Medical Scissors', image: 'https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=400&h=400&fit=crop&q=80' },
				{ id: 'forceps', name: 'Medical Forceps', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=400&fit=crop&q=80' },
				{ id: 'otoscope', name: 'Otoscope', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop&q=80' },
				{ id: 'ophthalmoscope', name: 'Ophthalmoscope', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80' },
				{ id: 'surgical-instrument-set', name: 'Basic Surgical Instrument Set', image: 'https://images.unsplash.com/photo-1583912086296-be5ec48f7c39?w=400&h=400&fit=crop&q=80' }
			]
		},
		{
			id: 'disposable',
			icon: Syringe,
			name: 'Disposable Medical Supplies',
			description: 'Single-use medical supplies and protective equipment',
			products: [
				{ id: 'gloves-nitrile', name: 'Nitrile Gloves', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'gloves-latex', name: 'Latex Gloves', image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400&h=400&fit=crop&q=80' },
				{ id: 'gloves-vinyl', name: 'Vinyl Gloves', image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop&q=80' },
				{ id: 'surgical-masks', name: 'Surgical Masks', image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=400&fit=crop&q=80' },
				{ id: 'n95-respirators', name: 'N95 Respirators', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'disposable-gowns', name: 'Disposable Gowns', image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop&q=80' },
				{ id: 'disposable-aprons', name: 'Disposable Aprons', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=400&fit=crop&q=80' },
				{ id: 'bandages', name: 'Bandages', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'gauze', name: 'Gauze', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop&q=80' },
				{ id: 'adhesive-tape', name: 'Adhesive Tape', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop&q=80' },
				{ id: 'syringes', name: 'Syringes & Needles', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop&q=80' },
				{ id: 'alcohol-swabs', name: 'Alcohol Swabs', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'antiseptic-wipes', name: 'Antiseptic Wipes', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop&q=80' },
				{ id: 'tooth-swabs', name: 'Tooth Swabs', image: 'https://images.unsplash.com/photo-1598300042247-d90d9c36ba75?w=400&h=400&fit=crop&q=80' },
				{ id: 'cotton-balls', name: 'Cotton Balls', image: 'https://images.unsplash.com/photo-1599351431613-4e25c0a5d0a7?w=400&h=400&fit=crop&q=80' },
				{ id: 'catheters', name: 'Catheters (Various Types)', image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=400&fit=crop&q=80' }
			]
		},
		{
			id: 'first-aid',
			icon: Package,
			name: 'First Aid & Emergency Care',
			description: 'Essential supplies for emergency response and first aid',
			products: [
				{ id: 'first-aid-kit-home', name: 'First Aid Kit (Home)', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'first-aid-kit-workplace', name: 'First Aid Kit (Workplace)', image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400&h=400&fit=crop&q=80' },
				{ id: 'first-aid-kit-travel', name: 'First Aid Kit (Travel)', image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop&q=80' },
				{ id: 'wound-dressings', name: 'Wound Dressings', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=400&fit=crop&q=80' },
				{ id: 'hydrocolloid-pads', name: 'Hydrocolloid Pads', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop&q=80' },
				{ id: 'elastic-bandages', name: 'Elastic Bandages', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop&q=80' },
				{ id: 'compression-wraps', name: 'Compression Wraps', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'eye-care-kit', name: 'Eye Care Kit', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop&q=80' }
			]
		},
		{
			id: 'health-wellness',
			icon: Droplet,
			name: 'Health & Wellness Products',
			description: 'Support products for daily health management',
			products: [
				{ id: 'compression-stockings', name: 'Compression Stockings', image: 'https://images.unsplash.com/photo-1556906918-a7f1c0c4e6b8?w=400&h=400&fit=crop&q=80' },
				{ id: 'diabetic-test-strips', name: 'Diabetic Test Strips', image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400&h=400&fit=crop&q=80' },
				{ id: 'lancets', name: 'Lancets', image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop&q=80' },
				{ id: 'glucose-meter', name: 'Glucose Meter', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop&q=80' },
				{ id: 'incontinence-diapers', name: 'Adult Diapers', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=400&fit=crop&q=80' },
				{ id: 'incontinence-pads', name: 'Incontinence Pads', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop&q=80' },
				{ id: 'heating-pads', name: 'Heating Pads', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'cold-packs', name: 'Cold Packs', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop&q=80' },
				{ id: 'knee-brace', name: 'Knee Support Brace', image: 'https://images.unsplash.com/photo-1599351431186-85c8f0cd7249?w=400&h=400&fit=crop&q=80' },
				{ id: 'wrist-brace', name: 'Wrist Support Brace', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop&q=80' },
				{ id: 'ankle-brace', name: 'Ankle Support Brace', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'back-brace', name: 'Back Support Brace', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop&q=80' }
			]
		},
		{
			id: 'testing',
			icon: TestTube2,
			name: 'Home Testing Kits',
			description: 'Diagnostic and monitoring kits for home use',
			products: [
				{ id: 'cholesterol-test', name: 'Cholesterol Test Kit', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop&q=80' },
				{ id: 'pregnancy-test', name: 'Home Pregnancy Test', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'ecg-monitor', name: 'Portable ECG/EKG Monitor', image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop&q=80' }
			]
		},
		{
			id: 'sanitization',
			icon: Sparkles,
			name: 'Sanitization & Hygiene',
			description: 'Products for maintaining cleanliness and infection control',
			products: [
				{ id: 'hand-sanitizer-large', name: 'Hand Sanitizer (Large)', image: 'https://images.unsplash.com/photo-1584874267670-8bb5440e2c6c?w=400&h=400&fit=crop&q=80' },
				{ id: 'hand-sanitizer-travel', name: 'Hand Sanitizer (Travel)', image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop&q=80' },
				{ id: 'disinfectant-spray', name: 'Surface Disinfectant Spray', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&q=80' },
				{ id: 'disinfectant-wipes', name: 'Surface Disinfectant Wipes', image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400&h=400&fit=crop&q=80' },
				{ id: 'uv-sterilizer', name: 'UV Sterilizer Box', image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop&q=80' }
			]
		}
	];

	let selectedCategory = $state<string | null>(null);

	function toggleInquiry(product: any, category: any) {
		const item = {
			id: product.id,
			name: product.name,
			category: category.name,
			image: product.image
		};

		if (inquiryCart.has(product.id)) {
			inquiryCart.remove(product.id);
		} else {
			inquiryCart.add(item);
		}
	}

	const filteredCategories = $derived(
		selectedCategory
			? productCategories.filter(cat => cat.id === selectedCategory)
			: productCategories
	);
</script>

<svelte:head>
	<title>Medical Supplies - SESI Healthcare</title>
	<meta name="description" content="Quality medical equipment and supplies for home healthcare, rehabilitation, and personal care." />
</svelte:head>

<Hero
	title="Medical Supplies <br/>& Equipment"
	subtitle="Quality medical equipment and supplies delivered to your doorstep. Request a quote for any item you need."
	badge="Medical Supplies"
	variant="gradient"
	decorative={true}
/>

<!-- Category Filter & Cart -->
<section class="py-8 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
			<!-- Category Filter -->
			<div class="flex flex-wrap items-center gap-2">
				<button
					onclick={() => selectedCategory = null}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all {selectedCategory === null ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
				>
					All Categories
				</button>
				{#each productCategories as category}
					<button
						onclick={() => selectedCategory = category.id}
						class="px-4 py-2 rounded-lg text-sm font-medium transition-all {selectedCategory === category.id ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
					>
						{category.name}
					</button>
				{/each}
			</div>

			<!-- Inquiry Cart -->
			<a
				href="/medical-supplies/inquiry"
				class="group flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
			>
				<ShoppingBag class="h-5 w-5" />
				<span>Inquiry List</span>
				{#if inquiryCart.count > 0}
					<span class="flex items-center justify-center h-6 w-6 rounded-full bg-white text-emerald-600 text-xs font-bold">
						{inquiryCart.count}
					</span>
				{/if}
			</a>
		</div>
	</div>
</section>

<!-- Products Grid -->
<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		{#each filteredCategories as category}
			{@const Icon = category.icon}
			<div class="mb-20">
				<!-- Category Header -->
				<div class="flex items-center gap-4 mb-10">
					<div class="shrink-0 rounded-xl bg-emerald-100 p-3 text-emerald-600">
						<Icon class="h-7 w-7" />
					</div>
					<div>
						<h2 class="text-3xl font-bold text-gray-900">{category.name}</h2>
						<p class="text-gray-600 mt-1">{category.description}</p>
					</div>
				</div>

				<!-- Products Grid -->
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
					{#each category.products as product}
						<div class="group rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
							<!-- Product Image -->
							<div class="relative h-48 overflow-hidden bg-gray-100">
								<img
									src={product.image}
									alt={product.name}
									loading="lazy"
									decoding="async"
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								{#if inquiryCart.has(product.id)}
									<div class="absolute top-2 right-2 bg-emerald-600 text-white rounded-full p-2">
										<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
										</svg>
									</div>
								{/if}
							</div>

							<!-- Product Info -->
							<div class="p-4">
								<h3 class="font-semibold text-gray-900 mb-3 line-clamp-2">{product.name}</h3>
								<button
									onclick={() => toggleInquiry(product, category)}
									class="w-full px-4 py-2 rounded-lg text-sm font-medium transition-all {inquiryCart.has(product.id) ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'}"
								>
									{inquiryCart.has(product.id) ? 'Remove from Inquiry' : 'Add to Inquiry'}
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- CTA -->
<section class="bg-emerald-600 py-24">
	<div class="container mx-auto px-6 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-4xl font-bold text-white sm:text-5xl mb-6">
				Ready to Request a Quote?
			</h2>
			<p class="text-xl text-emerald-50 mb-10 leading-relaxed">
				Add items to your inquiry list and we'll get back to you with pricing and availability.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/medical-supplies/inquiry"
					class="group inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-lg"
				>
					View Inquiry List ({inquiryCart.count})
					<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="/contact"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300"
				>
					Contact Us
				</a>
			</div>
		</div>
	</div>
</section>
