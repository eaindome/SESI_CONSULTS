<script lang="ts">
	import { Star, MessageSquare } from '@lucide/svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { toasts } from '$lib/stores/toasts';
	import { onMount } from 'svelte';

	interface FeedbackItem {
		id: string;
		name: string;
		email?: string;
		rating: number;
		message: string;
		service?: string;
		createdAt: string;
	}

	let feedback = $state<FeedbackItem[]>([]);
	let total = $state(0);
	let isLoading = $state(false);
	let currentPage = $state(0);
	let selectedItem = $state<FeedbackItem | null>(null);

	const limit = 20;

	onMount(() => loadFeedback());

	async function loadFeedback() {
		isLoading = true;
		try {
			const params = new URLSearchParams({
				limit: String(limit),
				offset: String(currentPage * limit)
			});
			const response = await fetch(`/api/admin/feedback?${params}`);
			const data = await response.json();

			if (response.ok) {
				feedback = data.feedback;
				total = data.total;
			} else {
				toasts.error('Failed to load feedback');
			}
		} catch {
			toasts.error('Error loading feedback');
		} finally {
			isLoading = false;
		}
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	}

	function ratingLabel(rating: number): string {
		return ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating] ?? '';
	}

	function ratingVariant(rating: number): 'default' | 'warning' | 'success' {
		if (rating >= 4) return 'success';
		if (rating === 3) return 'default';
		return 'warning';
	}

	const totalPages = $derived(Math.ceil(total / limit));

	const avgRating = $derived(
		feedback.length > 0
			? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
			: '—'
	);
</script>

<svelte:head>
	<title>Feedback - SESI Admin</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
		<div>
			<h2 class="text-2xl font-bold text-gray-900">Customer Feedback</h2>
			<p class="text-gray-600">Reviews submitted by patients</p>
		</div>
		<div class="flex items-center gap-4 text-sm text-gray-600">
			<div class="flex items-center gap-1 px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
				<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
				<span class="font-semibold">{avgRating}</span>
				<span class="text-gray-400">avg</span>
			</div>
			<div class="px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
				<span class="font-semibold">{total}</span> review{total !== 1 ? 's' : ''}
			</div>
		</div>
	</div>

	<!-- Table -->
	<div class="bg-white rounded-2xl shadow-sm overflow-hidden">
		{#if isLoading}
			<div class="p-12 text-center">
				<div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1a5f4a] border-r-transparent"></div>
				<p class="mt-4 text-gray-600">Loading feedback...</p>
			</div>
		{:else if feedback.length === 0}
			<div class="p-12 text-center">
				<MessageSquare class="h-12 w-12 text-gray-300 mx-auto mb-4" />
				<p class="text-gray-600">No feedback yet</p>
				<p class="text-sm text-gray-400 mt-1">Customer reviews will appear here once submitted</p>
			</div>
		{:else}
			<!-- Desktop table -->
			<div class="hidden md:block overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50 border-b border-gray-200">
						<tr>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Service</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Message</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each feedback as item (item.id)}
							<tr
								class="hover:bg-gray-50 transition-colors cursor-pointer"
								onclick={() => selectedItem = item}
							>
								<td class="px-6 py-4">
									<div class="font-medium text-gray-900">{item.name}</div>
									{#if item.email}
										<div class="text-xs text-gray-400">{item.email}</div>
									{/if}
								</td>
								<td class="px-6 py-4">
									<div class="flex items-center gap-1.5">
										<div class="flex">
											{#each [1,2,3,4,5] as s}
												<Star class="h-3.5 w-3.5 {s <= item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}" />
											{/each}
										</div>
										<Badge variant={ratingVariant(item.rating)}>
											{ratingLabel(item.rating)}
										</Badge>
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="text-sm text-gray-600">{item.service || '—'}</div>
								</td>
								<td class="px-6 py-4 max-w-xs">
									<p class="text-sm text-gray-700 line-clamp-2">{item.message}</p>
								</td>
								<td class="px-6 py-4">
									<div class="text-sm text-gray-500">{formatDate(item.createdAt)}</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Mobile cards -->
			<div class="md:hidden divide-y divide-gray-200">
				{#each feedback as item (item.id)}
					<button
						class="w-full p-4 text-left space-y-2 hover:bg-gray-50 transition-colors"
						onclick={() => selectedItem = item}
					>
						<div class="flex justify-between items-start">
							<div class="font-medium text-gray-900">{item.name}</div>
							<div class="flex">
								{#each [1,2,3,4,5] as s}
									<Star class="h-3.5 w-3.5 {s <= item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}" />
								{/each}
							</div>
						</div>
						{#if item.service}
							<div class="text-xs text-[#1a5f4a] font-medium">{item.service}</div>
						{/if}
						<p class="text-sm text-gray-600 line-clamp-2">{item.message}</p>
						<div class="text-xs text-gray-400">{formatDate(item.createdAt)}</div>
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Pagination -->
	{#if totalPages > 1}
		<div class="flex justify-center gap-2">
			<Button
				size="sm"
				variant="secondary"
				disabled={currentPage === 0}
				onclick={() => { currentPage--; loadFeedback(); }}
			>
				Previous
			</Button>
			<span class="px-4 py-2 text-sm text-gray-600">
				Page {currentPage + 1} of {totalPages}
			</span>
			<Button
				size="sm"
				variant="secondary"
				disabled={currentPage >= totalPages - 1}
				onclick={() => { currentPage++; loadFeedback(); }}
			>
				Next
			</Button>
		</div>
	{/if}
</div>

<!-- Detail modal -->
{#if selectedItem}
	<div
		class="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4"
		onclick={() => selectedItem = null}
		role="button"
		tabindex="0"
	>
		<div
			class="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="p-6 border-b border-gray-200 flex justify-between items-start">
				<div>
					<h3 class="text-lg font-bold text-gray-900">{selectedItem.name}</h3>
					{#if selectedItem.email}
						<p class="text-sm text-gray-500">{selectedItem.email}</p>
					{/if}
				</div>
				<button
					onclick={() => selectedItem = null}
					class="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
					aria-label="Close"
				>
					✕
				</button>
			</div>
			<div class="p-6 space-y-4">
				<div class="flex items-center gap-3">
					<div class="flex">
						{#each [1,2,3,4,5] as s}
							<Star class="h-5 w-5 {s <= selectedItem.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}" />
						{/each}
					</div>
					<span class="font-semibold text-gray-700">{ratingLabel(selectedItem.rating)}</span>
				</div>
				{#if selectedItem.service}
					<div>
						<span class="text-xs font-semibold text-gray-500 uppercase">Service</span>
						<p class="mt-1 text-sm font-medium text-[#1a5f4a]">{selectedItem.service}</p>
					</div>
				{/if}
				<div>
					<span class="text-xs font-semibold text-gray-500 uppercase">Message</span>
					<p class="mt-1 text-gray-800 leading-relaxed">{selectedItem.message}</p>
				</div>
				<p class="text-xs text-gray-400">{formatDate(selectedItem.createdAt)}</p>
			</div>
		</div>
	</div>
{/if}
