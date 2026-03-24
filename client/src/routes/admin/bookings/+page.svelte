<script lang="ts">
	import { Search, Filter, Calendar, User, Mail, Phone, MapPin, X, MoreVertical, Eye, Check, Clock, Trash2 } from '@lucide/svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { toasts } from '$lib/stores/toasts';

	type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED';

	interface Booking {
		id: string;
		service: string;
		dateTime: string;
		name: string;
		email: string;
		phone: string;
		address: string;
		notes?: string;
		status: BookingStatus;
		createdAt: string;
	}

	let bookings = $state<Booking[]>([]);
	let total = $state(0);
	let isLoading = $state(false);
	let searchQuery = $state('');
	let statusFilter = $state<BookingStatus | ''>('');
	let currentPage = $state(0);
	let selectedBooking = $state<Booking | null>(null);
	let showDetails = $state(false);
	let useDummyData = $state(false);
	let openMenuId = $state<string | null>(null);

	const limit = 15;

	// Dummy data for preview
	const dummyBookings: Booking[] = [
		{
			id: '1',
			service: 'General Nursing Care',
			dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
			name: 'Kwame Mensah',
			email: 'kwame.mensah@example.com',
			phone: '+233 24 123 4567',
			address: '123 Liberation Road, Accra',
			notes: 'Patient prefers morning appointments',
			status: 'PENDING',
			createdAt: new Date().toISOString()
		},
		{
			id: '2',
			service: 'Injection Services',
			dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
			name: 'Ama Osei',
			email: 'ama.osei@example.com',
			phone: '+233 20 987 6543',
			address: '45 Osu Oxford Street, Accra',
			notes: null,
			status: 'CONFIRMED',
			createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
		},
		{
			id: '3',
			service: 'Post-Operative Care',
			dateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
			name: 'Kofi Asante',
			email: 'kofi.asante@example.com',
			phone: '+233 55 234 5678',
			address: '78 Cantonments Road, Accra',
			notes: 'Recent surgery, requires gentle care',
			status: 'COMPLETED',
			createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
		},
		{
			id: '4',
			service: 'Chronic Disease Management',
			dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
			name: 'Akosua Adjei',
			email: 'akosua.adjei@example.com',
			phone: '+233 27 345 6789',
			address: '12 East Legon, Accra',
			notes: 'Diabetes patient, needs regular monitoring',
			status: 'CONFIRMED',
			createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
		},
		{
			id: '5',
			service: 'Elderly Care',
			dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
			name: 'Yaw Boateng',
			email: 'yaw.boateng@example.com',
			phone: '+233 24 456 7890',
			address: '56 Airport Residential Area, Accra',
			notes: 'Patient has limited mobility',
			status: 'PENDING',
			createdAt: new Date().toISOString()
		},
		{
			id: '6',
			service: 'Maternal & Child Care',
			dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
			name: 'Abena Owusu',
			email: 'abena.owusu@example.com',
			phone: '+233 26 567 8901',
			address: '34 Roman Ridge, Accra',
			notes: 'Postnatal care for new mother',
			status: 'CONFIRMED',
			createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
		}
	];

	$effect(() => {
		loadBookings();
	});

	async function loadBookings() {
		if (useDummyData) {
			isLoading = true;
			await new Promise(resolve => setTimeout(resolve, 500));

			let filtered = [...dummyBookings];

			if (statusFilter) {
				filtered = filtered.filter(b => b.status === statusFilter);
			}

			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				filtered = filtered.filter(b =>
					b.name.toLowerCase().includes(query) ||
					b.email.toLowerCase().includes(query) ||
					b.phone.includes(query)
				);
			}

			bookings = filtered;
			total = filtered.length;
			isLoading = false;
			return;
		}

		isLoading = true;

		try {
			const params = new URLSearchParams({
				limit: String(limit),
				offset: String(currentPage * limit)
			});

			if (statusFilter) params.set('status', statusFilter);
			if (searchQuery) params.set('search', searchQuery);

			const response = await fetch(`/api/admin/bookings?${params}`);
			const data = await response.json();

			if (response.ok) {
				bookings = data.bookings;
				total = data.total;
			} else {
				toasts.error('Failed to load bookings');
			}
		} catch (error) {
			toasts.error('Error loading bookings');
		} finally {
			isLoading = false;
		}
	}

	async function updateStatus(booking: Booking, newStatus: BookingStatus) {
		if (useDummyData) {
			const index = bookings.findIndex(b => b.id === booking.id);
			if (index !== -1) {
				bookings[index].status = newStatus;
				bookings = [...bookings];
			}
			toasts.success(`Booking ${newStatus.toLowerCase()}`);
			return;
		}

		try {
			const response = await fetch('/api/admin/bookings', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: booking.id, status: newStatus })
			});

			if (response.ok) {
				toasts.success(`Booking ${newStatus.toLowerCase()}`);
				loadBookings();
			} else {
				toasts.error('Failed to update booking');
			}
		} catch (error) {
			toasts.error('Error updating booking');
		}
	}

	async function deleteBooking(booking: Booking) {
		if (!confirm(`Delete booking for ${booking.name}?`)) return;

		if (useDummyData) {
			bookings = bookings.filter(b => b.id !== booking.id);
			total = bookings.length;
			toasts.success('Booking deleted');
			return;
		}

		try {
			const response = await fetch('/api/admin/bookings', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: booking.id })
			});

			if (response.ok) {
				toasts.success('Booking deleted');
				loadBookings();
			} else {
				toasts.error('Failed to delete booking');
			}
		} catch (error) {
			toasts.error('Error deleting booking');
		}
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getStatusColor(status: BookingStatus): 'default' | 'warning' | 'success' {
		if (status === 'PENDING') return 'warning';
		if (status === 'CONFIRMED') return 'default';
		return 'success';
	}

	function toggleMenu(id: string) {
		openMenuId = openMenuId === id ? null : id;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.menu-container')) {
			openMenuId = null;
		}
	}

	const totalPages = $derived(Math.ceil(total / limit));

	function handleSearch() {
		currentPage = 0;
		loadBookings();
	}

	function handleFilterChange() {
		currentPage = 0;
		loadBookings();
	}
</script>

<svelte:head>
	<title>Bookings Management - SESI Admin</title>
</svelte:head>

<svelte:window onclick={handleClickOutside} />

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
		<div>
			<h2 class="text-2xl font-bold text-gray-900">Bookings Management</h2>
			<p class="text-gray-600">Manage all home care appointments</p>
		</div>
		<div class="flex items-center gap-4">
			<!-- Dummy Data Toggle -->
			<label class="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
				<input
					type="checkbox"
					bind:checked={useDummyData}
					onchange={() => loadBookings()}
					class="w-4 h-4 text-[#1a5f4a] rounded focus:ring-2 focus:ring-[#1a5f4a]/20"
				/>
				<span class="text-sm font-medium text-gray-700">Preview with dummy data</span>
			</label>

			<div class="flex items-center gap-2 text-sm text-gray-600">
				<Calendar class="h-4 w-4" />
				<span>Total: {total} booking{total !== 1 ? 's' : ''}</span>
			</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="bg-white rounded-2xl shadow-sm p-4 space-y-4">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<!-- Search -->
			<div class="relative">
				<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
					<Search class="h-5 w-5 text-gray-400" />
				</div>
				<input
					type="text"
					bind:value={searchQuery}
					oninput={handleSearch}
					placeholder="Search by name, email, or phone..."
					class="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20"
				/>
			</div>

			<!-- Status Filter -->
			<div class="relative">
				<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
					<Filter class="h-5 w-5 text-gray-400" />
				</div>
				<select
					bind:value={statusFilter}
					onchange={handleFilterChange}
					class="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20 appearance-none cursor-pointer"
					style="background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e'); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1.2em;"
				>
					<option value="">All Statuses</option>
					<option value="PENDING">Pending</option>
					<option value="CONFIRMED">Confirmed</option>
					<option value="COMPLETED">Completed</option>
				</select>
			</div>
		</div>
	</div>

	<!-- Bookings Table -->
	<div class="bg-white rounded-2xl shadow-sm overflow-hidden">
		{#if isLoading}
			<div class="p-12 text-center">
				<div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1a5f4a] border-r-transparent"></div>
				<p class="mt-4 text-gray-600">Loading bookings...</p>
			</div>
		{:else if bookings.length === 0}
			<div class="p-12 text-center">
				<Calendar class="h-12 w-12 text-gray-300 mx-auto mb-4" />
				<p class="text-gray-600">No bookings found</p>
			</div>
		{:else}
			<!-- Desktop Table -->
			<div class="hidden md:block overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50 border-b border-gray-200">
						<tr>
							<th class="px-4 py-4 w-12"></th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Service</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each bookings as booking (booking.id)}
							<tr class="hover:bg-gray-50 transition-colors">
								<!-- Kebab Menu -->
								<td class="px-4 py-4">
									<div class="relative menu-container">
										<button
											onclick={(e) => { e.stopPropagation(); toggleMenu(booking.id); }}
											class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
											aria-label="Actions"
										>
											<MoreVertical class="h-4 w-4 text-gray-500" />
										</button>

										{#if openMenuId === booking.id}
											<div class="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
												<div class="py-1">
													<button
														onclick={() => { selectedBooking = booking; showDetails = true; openMenuId = null; }}
														class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"
													>
														<Eye class="h-4 w-4" />
														View Details
													</button>

													{#if booking.status === 'PENDING'}
														<button
															onclick={() => { updateStatus(booking, 'CONFIRMED'); openMenuId = null; }}
															class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-green-700"
														>
															<Check class="h-4 w-4" />
															Confirm
														</button>
													{/if}

													{#if booking.status === 'CONFIRMED'}
														<button
															onclick={() => { updateStatus(booking, 'COMPLETED'); openMenuId = null; }}
															class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-blue-700"
														>
															<Clock class="h-4 w-4" />
															Mark Complete
														</button>
													{/if}

													<hr class="my-1 border-gray-100" />

													<button
														onclick={() => { deleteBooking(booking); openMenuId = null; }}
														class="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-3 text-red-600"
													>
														<Trash2 class="h-4 w-4" />
														Delete
													</button>
												</div>
											</div>
										{/if}
									</div>
								</td>

								<td class="px-6 py-4">
									<div class="font-medium text-gray-900">{booking.name}</div>
									<div class="text-sm text-gray-500 flex items-center gap-1">
										<Phone class="h-3 w-3" />
										{booking.phone}
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="text-sm text-gray-900">{booking.service}</div>
								</td>
								<td class="px-6 py-4">
									<div class="text-sm text-gray-900">{formatDate(booking.dateTime)}</div>
								</td>
								<td class="px-6 py-4">
									<Badge variant={getStatusColor(booking.status)}>
										{booking.status}
									</Badge>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Mobile Cards -->
			<div class="md:hidden divide-y divide-gray-200">
				{#each bookings as booking (booking.id)}
					<div class="p-4 space-y-3">
						<div class="flex justify-between items-start">
							<div>
								<div class="font-medium text-gray-900">{booking.name}</div>
								<div class="text-sm text-gray-500">{booking.service}</div>
							</div>
							<div class="flex items-center gap-2">
								<Badge variant={getStatusColor(booking.status)}>
									{booking.status}
								</Badge>
								<!-- Mobile kebab -->
								<div class="relative menu-container">
									<button
										onclick={(e) => { e.stopPropagation(); toggleMenu(booking.id + '-mobile'); }}
										class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
										aria-label="Actions"
									>
										<MoreVertical class="h-4 w-4 text-gray-500" />
									</button>

									{#if openMenuId === booking.id + '-mobile'}
										<div class="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
											<div class="py-1">
												<button
													onclick={() => { selectedBooking = booking; showDetails = true; openMenuId = null; }}
													class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"
												>
													<Eye class="h-4 w-4" />
													View Details
												</button>

												{#if booking.status === 'PENDING'}
													<button
														onclick={() => { updateStatus(booking, 'CONFIRMED'); openMenuId = null; }}
														class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-green-700"
													>
														<Check class="h-4 w-4" />
														Confirm
													</button>
												{/if}

												{#if booking.status === 'CONFIRMED'}
													<button
														onclick={() => { updateStatus(booking, 'COMPLETED'); openMenuId = null; }}
														class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-blue-700"
													>
														<Clock class="h-4 w-4" />
														Mark Complete
													</button>
												{/if}

												<hr class="my-1 border-gray-100" />

												<button
													onclick={() => { deleteBooking(booking); openMenuId = null; }}
													class="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-3 text-red-600"
												>
													<Trash2 class="h-4 w-4" />
													Delete
												</button>
											</div>
										</div>
									{/if}
								</div>
							</div>
						</div>
						<div class="text-sm text-gray-600">{formatDate(booking.dateTime)}</div>
					</div>
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
				onclick={() => { currentPage--; loadBookings(); }}
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
				onclick={() => { currentPage++; loadBookings(); }}
			>
				Next
			</Button>
		</div>
	{/if}
</div>

<!-- Booking Details Modal -->
{#if showDetails && selectedBooking}
	<div
		class="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4"
		onclick={() => showDetails = false}
		role="button"
		tabindex="0"
	>
		<div
			class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<div class="p-6 border-b border-gray-200 flex justify-between items-start">
				<div>
					<h3 class="text-xl font-bold text-gray-900">Booking Details</h3>
					<p class="text-sm text-gray-600 mt-1">ID: {selectedBooking.id}</p>
				</div>
				<button
					onclick={() => showDetails = false}
					class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<div class="p-6 space-y-6">
				<div>
					<h4 class="text-sm font-semibold text-gray-600 uppercase mb-3">Patient Information</h4>
					<div class="space-y-3">
						<div class="flex items-start gap-3">
							<User class="h-5 w-5 text-gray-400 mt-0.5" />
							<div>
								<div class="text-sm text-gray-600">Name</div>
								<div class="font-medium text-gray-900">{selectedBooking.name}</div>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Mail class="h-5 w-5 text-gray-400 mt-0.5" />
							<div>
								<div class="text-sm text-gray-600">Email</div>
								<div class="font-medium text-gray-900">{selectedBooking.email}</div>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Phone class="h-5 w-5 text-gray-400 mt-0.5" />
							<div>
								<div class="text-sm text-gray-600">Phone</div>
								<div class="font-medium text-gray-900">{selectedBooking.phone}</div>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<MapPin class="h-5 w-5 text-gray-400 mt-0.5" />
							<div>
								<div class="text-sm text-gray-600">Address</div>
								<div class="font-medium text-gray-900">{selectedBooking.address}</div>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h4 class="text-sm font-semibold text-gray-600 uppercase mb-3">Appointment Details</h4>
					<div class="space-y-3">
						<div>
							<div class="text-sm text-gray-600">Service</div>
							<div class="font-medium text-gray-900">{selectedBooking.service}</div>
						</div>
						<div>
							<div class="text-sm text-gray-600">Date & Time</div>
							<div class="font-medium text-gray-900">{formatDate(selectedBooking.dateTime)}</div>
						</div>
						<div>
							<div class="text-sm text-gray-600">Status</div>
							<div class="mt-1">
								<Badge variant={getStatusColor(selectedBooking.status)}>
									{selectedBooking.status}
								</Badge>
							</div>
						</div>
						{#if selectedBooking.notes}
							<div>
								<div class="text-sm text-gray-600">Notes</div>
								<div class="mt-1 p-3 bg-gray-50 rounded-lg text-gray-900">{selectedBooking.notes}</div>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="p-6 border-t border-gray-200 flex gap-3">
				{#if selectedBooking.status === 'PENDING'}
					<Button
						variant="primary"
						fullWidth
						onclick={() => { updateStatus(selectedBooking!, 'CONFIRMED'); showDetails = false; }}
					>
						Confirm Booking
					</Button>
				{:else if selectedBooking.status === 'CONFIRMED'}
					<Button
						variant="primary"
						fullWidth
						onclick={() => { updateStatus(selectedBooking!, 'COMPLETED'); showDetails = false; }}
					>
						Mark as Completed
					</Button>
				{/if}
				<Button
					variant="secondary"
					onclick={() => showDetails = false}
				>
					Close
				</Button>
			</div>
		</div>
	</div>
{/if}
