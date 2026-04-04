<script lang="ts">
	import { Search, Calendar, User, Mail, Phone, MapPin, X, MoreVertical, Eye, Check, Clock, Trash2, Edit2 } from '@lucide/svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import CustomSelect from '$lib/components/ui/CustomSelect.svelte';
	import DatePicker from '$lib/components/ui/DatePicker.svelte';
	import { toasts } from '$lib/stores/toasts';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	type BookingStatus = 'PENDING' | 'IN_PROGRESS' | 'CONFIRMED' | 'COMPLETED';

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

	// View drawer
	let selectedBooking = $state<Booking | null>(null);
	let showDetails = $state(false);

	// Edit drawer
	let editingBooking = $state<Booking | null>(null);
	let showEditDrawer = $state(false);
	let editForm = $state({ service: '', date: '', time: '', phone: '', address: '', notes: '' });
	let isSubmitting = $state(false);

	// Delete confirmation modal
	let bookingToDelete = $state<Booking | null>(null);
	let isDeleting = $state(false);

	const services = [
		'General Nursing Care',
		'Injection Services',
		'Post-Operative Care',
		'Chronic Disease Management',
		'Elderly Care',
		'Maternal & Child Care'
	];
	const timeSlots = [
		'08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
		'12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
		'04:00 PM', '05:00 PM', '06:00 PM'
	];

	let useDummyData = $state(false);
	let openMenuId = $state<string | null>(null);

	const limit = 15;

	const statusTabs: { value: BookingStatus | ''; label: string }[] = [
		{ value: '', label: 'All' },
		{ value: 'PENDING', label: 'Pending' },
		{ value: 'IN_PROGRESS', label: 'In Progress' },
		{ value: 'CONFIRMED', label: 'Confirmed' },
		{ value: 'COMPLETED', label: 'Completed' }
	];

	// Dummy data for preview
	const dummyBookings: Booking[] = [
		{
			id: '1', service: 'General Nursing Care',
			dateTime: new Date(Date.now() + 2 * 86400000).toISOString(),
			name: 'Kwame Mensah', email: 'kwame.mensah@example.com',
			phone: '+233 24 123 4567', address: '123 Liberation Road, Accra',
			notes: 'Patient prefers morning appointments', status: 'PENDING',
			createdAt: new Date().toISOString()
		},
		{
			id: '2', service: 'Injection Services',
			dateTime: new Date(Date.now() + 86400000).toISOString(),
			name: 'Ama Osei', email: 'ama.osei@example.com',
			phone: '+233 20 987 6543', address: '45 Osu Oxford Street, Accra',
			status: 'CONFIRMED', createdAt: new Date(Date.now() - 86400000).toISOString()
		},
		{
			id: '3', service: 'Post-Operative Care',
			dateTime: new Date(Date.now() - 2 * 86400000).toISOString(),
			name: 'Kofi Asante', email: 'kofi.asante@example.com',
			phone: '+233 55 234 5678', address: '78 Cantonments Road, Accra',
			notes: 'Recent surgery, requires gentle care', status: 'COMPLETED',
			createdAt: new Date(Date.now() - 5 * 86400000).toISOString()
		},
		{
			id: '4', service: 'Chronic Disease Management',
			dateTime: new Date(Date.now() + 3 * 86400000).toISOString(),
			name: 'Akosua Adjei', email: 'akosua.adjei@example.com',
			phone: '+233 27 345 6789', address: '12 East Legon, Accra',
			notes: 'Diabetes patient, needs regular monitoring', status: 'IN_PROGRESS',
			createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
		},
		{
			id: '5', service: 'Elderly Care',
			dateTime: new Date(Date.now() + 5 * 86400000).toISOString(),
			name: 'Yaw Boateng', email: 'yaw.boateng@example.com',
			phone: '+233 24 456 7890', address: '56 Airport Residential Area, Accra',
			notes: 'Patient has limited mobility', status: 'PENDING',
			createdAt: new Date().toISOString()
		},
		{
			id: '6', service: 'Maternal & Child Care',
			dateTime: new Date(Date.now() + 86400000).toISOString(),
			name: 'Abena Owusu', email: 'abena.owusu@example.com',
			phone: '+233 26 567 8901', address: '34 Roman Ridge, Accra',
			notes: 'Postnatal care for new mother', status: 'CONFIRMED',
			createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
		}
	];

	$effect(() => { loadBookings(); });

	async function loadBookings() {
		if (useDummyData) {
			isLoading = true;
			await new Promise(r => setTimeout(r, 500));
			let filtered = [...dummyBookings];
			if (statusFilter) filtered = filtered.filter(b => b.status === statusFilter);
			if (searchQuery) {
				const q = searchQuery.toLowerCase();
				filtered = filtered.filter(b =>
					b.name.toLowerCase().includes(q) ||
					b.email.toLowerCase().includes(q) ||
					b.phone.includes(q)
				);
			}
			bookings = filtered;
			total = filtered.length;
			isLoading = false;
			return;
		}

		isLoading = true;
		try {
			const params = new URLSearchParams({ limit: String(limit), offset: String(currentPage * limit) });
			if (statusFilter) params.set('status', statusFilter);
			if (searchQuery) params.set('search', searchQuery);

			const response = await fetch(`/api/admin/bookings?${params}`);
			const data = await response.json();
			if (response.ok) { bookings = data.bookings; total = data.total; }
			else toasts.error('Failed to load bookings');
		} catch { toasts.error('Error loading bookings'); }
		finally { isLoading = false; }
	}

	async function updateStatus(booking: Booking, newStatus: BookingStatus) {
		if (useDummyData) {
			const i = bookings.findIndex(b => b.id === booking.id);
			if (i !== -1) {
				bookings[i] = { ...bookings[i], status: newStatus };
				bookings = [...bookings];
				if (selectedBooking?.id === booking.id) selectedBooking = bookings[i];
			}
			toasts.success('Status updated');
			return;
		}
		try {
			const response = await fetch('/api/admin/bookings', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: booking.id, status: newStatus })
			});
			if (response.ok) { toasts.success('Status updated'); loadBookings(); }
			else toasts.error('Failed to update booking');
		} catch { toasts.error('Error updating booking'); }
	}

	function openEdit(booking: Booking) {
		editingBooking = booking;
		editForm = {
			service: booking.service,
			date: new Date(booking.dateTime).toISOString().split('T')[0],
			time: toTimeSlot(booking.dateTime),
			phone: booking.phone,
			address: booking.address,
			notes: booking.notes ?? ''
		};
		showEditDrawer = true;
	}

	async function handleEditSubmit(e: Event) {
		e.preventDefault();
		if (!editingBooking) return;
		isSubmitting = true;

		const payload = {
			id: editingBooking.id,
			service: editForm.service,
			dateTime: new Date(`${editForm.date}T${convertTo24Hour(editForm.time)}`).toISOString(),
			phone: editForm.phone,
			address: editForm.address,
			notes: editForm.notes
		};

		if (useDummyData) {
			const i = bookings.findIndex(b => b.id === editingBooking!.id);
			if (i !== -1) {
				bookings[i] = { ...bookings[i], ...payload, dateTime: payload.dateTime };
				bookings = [...bookings];
				if (selectedBooking?.id === editingBooking.id) selectedBooking = bookings[i];
			}
			toasts.success('Booking updated');
			showEditDrawer = false;
			isSubmitting = false;
			return;
		}

		try {
			const response = await fetch('/api/admin/bookings', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			if (response.ok) { toasts.success('Booking updated'); showEditDrawer = false; loadBookings(); }
			else toasts.error('Failed to update booking');
		} catch { toasts.error('Error updating booking'); }
		finally { isSubmitting = false; }
	}

	function deleteBooking(booking: Booking) {
		bookingToDelete = booking;
	}

	async function confirmDelete() {
		if (!bookingToDelete) return;
		const booking = bookingToDelete;
		isDeleting = true;
		try {
			if (useDummyData) {
				bookings = bookings.filter(b => b.id !== booking.id);
				total = bookings.length;
				toasts.success('Booking deleted');
			} else {
				const response = await fetch('/api/admin/bookings', {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: booking.id })
				});
				if (response.ok) { toasts.success('Booking deleted'); loadBookings(); }
				else toasts.error('Failed to delete booking');
			}
		} catch { toasts.error('Error deleting booking'); }
		finally { isDeleting = false; bookingToDelete = null; }
	}

	function toTimeSlot(iso: string): string {
		const d = new Date(iso);
		let h = d.getHours();
		if (d.getMinutes() >= 30) h = Math.min(h + 1, 18);
		const period = h >= 12 ? 'PM' : 'AM';
		const h12 = h % 12 === 0 ? 12 : h % 12;
		const slot = `${String(h12).padStart(2, '0')}:00 ${period}`;
		return timeSlots.includes(slot) ? slot : '';
	}

	function convertTo24Hour(time12: string): string {
		const [time, period] = time12.split(' ');
		let [hours, minutes] = time.split(':');
		if (period === 'PM' && hours !== '12') hours = String(Number(hours) + 12);
		else if (period === 'AM' && hours === '12') hours = '00';
		return `${hours.padStart(2, '0')}:${minutes}:00`;
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-GB', {
			day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
		});
	}

	function getStatusBadge(status: BookingStatus): 'neutral' | 'warning' | 'info' | 'safe' {
		if (status === 'PENDING') return 'warning';
		if (status === 'IN_PROGRESS') return 'info';
		if (status === 'CONFIRMED') return 'neutral';
		return 'safe';
	}

	function statusLabel(status: BookingStatus): string {
		return status === 'IN_PROGRESS' ? 'In Progress' : status.charAt(0) + status.slice(1).toLowerCase();
	}

	let menuPosition = $state({ top: 0, left: 0 });

	function toggleMenu(id: string, event: MouseEvent) {
		if (openMenuId === id) { openMenuId = null; return; }
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		let left = rect.left;
		if (left + 192 > window.innerWidth) left = rect.right - 192;
		menuPosition = { top: rect.bottom + 4, left };
		openMenuId = id;
	}

	function handleClickOutside(event: MouseEvent) {
		if (!(event.target as HTMLElement).closest('.menu-container')) openMenuId = null;
	}

	const totalPages = $derived(Math.ceil(total / limit));
	function handleSearch() { currentPage = 0; loadBookings(); }
	function handleTabChange(val: BookingStatus | '') { statusFilter = val; currentPage = 0; loadBookings(); }
</script>

<svelte:head>
	<title>Bookings Management - SES Admin</title>
</svelte:head>

<svelte:window onclick={handleClickOutside} onscroll={() => openMenuId = null} />

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
		<div>
			<h2 class="text-2xl font-bold text-gray-900">Bookings Management</h2>
			<p class="text-gray-600">Manage all home care appointments</p>
		</div>
		<div class="flex items-center gap-4">
			<!-- <label class="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
				<input type="checkbox" bind:checked={useDummyData} onchange={() => loadBookings()} class="w-4 h-4 text-[#1a5f4a] rounded focus:ring-2 focus:ring-[#1a5f4a]/20" />
				<span class="text-sm font-medium text-gray-700">Preview with dummy data</span>
			</label> -->
			<div class="flex items-center gap-2 text-sm text-gray-600">
				<Calendar class="h-4 w-4" />
				<span>Total: {total} booking{total !== 1 ? 's' : ''}</span>
			</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="bg-white rounded-2xl shadow-sm p-4 space-y-3">
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
		<div class="flex overflow-x-auto gap-1 bg-gray-100 rounded-xl p-1">
			{#each statusTabs as tab}
				<button
					type="button"
					onclick={() => handleTabChange(tab.value)}
					class="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap {
						statusFilter === tab.value ? 'bg-white text-[#1a5f4a] shadow-sm' : 'text-gray-600 hover:text-gray-900'
					}"
				>{tab.label}</button>
			{/each}
		</div>
	</div>

	<!-- Bookings Table — overflow-hidden removed so kebab menus aren't clipped -->
	<div class="bg-white rounded-2xl shadow-sm">
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
							<th class="px-4 py-4 w-12 rounded-tl-2xl"></th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Service</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase rounded-tr-2xl">Status</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each bookings as booking (booking.id)}
							<tr class="hover:bg-gray-50 transition-colors">
								<td class="px-4 py-4">
									<div class="relative menu-container">
										<button onclick={(e) => { e.stopPropagation(); toggleMenu(booking.id, e); }} class="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Actions">
											<MoreVertical class="h-4 w-4 text-gray-500" />
										</button>
										{#if openMenuId === booking.id}
											<div class="fixed w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-[200]" style="top: {menuPosition.top}px; left: {menuPosition.left}px;">
												<div class="py-1">
													<button onclick={() => { selectedBooking = booking; showDetails = true; openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700">
														<Eye class="h-4 w-4" /> View Details
													</button>
													{#if booking.status !== 'COMPLETED'}
														<button onclick={() => { openEdit(booking); openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700">
															<Edit2 class="h-4 w-4" /> Edit
														</button>
													{/if}
													{#if booking.status === 'PENDING'}
														<button onclick={() => { updateStatus(booking, 'CONFIRMED'); openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-green-700">
															<Check class="h-4 w-4" /> Confirm
														</button>
													{/if}
													{#if booking.status === 'CONFIRMED'}
														<button onclick={() => { updateStatus(booking, 'IN_PROGRESS'); openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-blue-700">
															<Clock class="h-4 w-4" /> Mark In Progress
														</button>
													{/if}
													{#if booking.status === 'IN_PROGRESS'}
														<button onclick={() => { updateStatus(booking, 'COMPLETED'); openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-green-700">
															<Check class="h-4 w-4" /> Mark Complete
														</button>
													{/if}
													<hr class="my-1 border-gray-100" />
													<button onclick={() => { deleteBooking(booking); openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-3 text-red-600">
														<Trash2 class="h-4 w-4" /> Delete
													</button>
												</div>
											</div>
										{/if}
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="font-medium text-gray-900">{booking.name}</div>
									<div class="text-sm text-gray-500 flex items-center gap-1"><Phone class="h-3 w-3" />{booking.phone}</div>
								</td>
								<td class="px-6 py-4"><div class="text-sm text-gray-900">{booking.service}</div></td>
								<td class="px-6 py-4"><div class="text-sm text-gray-900">{formatDate(booking.dateTime)}</div></td>
								<td class="px-6 py-4"><Badge status={getStatusBadge(booking.status)}>{statusLabel(booking.status)}</Badge></td>
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
								<Badge status={getStatusBadge(booking.status)}>{statusLabel(booking.status)}</Badge>
								<div class="relative menu-container">
									<button onclick={(e) => { e.stopPropagation(); toggleMenu(booking.id + '-m', e); }} class="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Actions">
										<MoreVertical class="h-4 w-4 text-gray-500" />
									</button>
									{#if openMenuId === booking.id + '-m'}
										<div class="fixed w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-[200]" style="top: {menuPosition.top}px; left: {menuPosition.left}px;">
											<div class="py-1">
												<button onclick={() => { selectedBooking = booking; showDetails = true; openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"><Eye class="h-4 w-4" /> View Details</button>
												{#if booking.status !== 'COMPLETED'}<button onclick={() => { openEdit(booking); openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"><Edit2 class="h-4 w-4" /> Edit</button>{/if}
												{#if booking.status === 'PENDING'}<button onclick={() => { updateStatus(booking, 'CONFIRMED'); openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-green-700"><Check class="h-4 w-4" /> Confirm</button>{/if}
												{#if booking.status === 'CONFIRMED'}<button onclick={() => { updateStatus(booking, 'IN_PROGRESS'); openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-blue-700"><Clock class="h-4 w-4" /> Mark In Progress</button>{/if}
												{#if booking.status === 'IN_PROGRESS'}<button onclick={() => { updateStatus(booking, 'COMPLETED'); openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-green-700"><Check class="h-4 w-4" /> Mark Complete</button>{/if}
												<hr class="my-1 border-gray-100" />
												<button onclick={() => { deleteBooking(booking); openMenuId = null; }} class="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-3 text-red-600"><Trash2 class="h-4 w-4" /> Delete</button>
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
		<div class="flex items-center justify-center gap-3">
			<Button size="sm" variant="secondary" disabled={currentPage === 0} onclick={() => { currentPage--; loadBookings(); }}>Previous</Button>
			<span class="text-sm text-gray-600">Page <span class="font-semibold">{currentPage + 1}</span> / <span class="font-semibold">{totalPages}</span></span>
			<Button size="sm" variant="secondary" disabled={currentPage >= totalPages - 1} onclick={() => { currentPage++; loadBookings(); }}>Next</Button>
		</div>
	{/if}
</div>

<!-- ─── View Details Drawer ─── -->
{#if showDetails && selectedBooking}
	<div transition:fade={{ duration: 200 }} class="fixed inset-0 bg-gray-900/50 z-[60]" onclick={() => showDetails = false} role="button" tabindex="0"></div>
	<div transition:fly={{ x: 400, duration: 300, easing: cubicOut }} class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col">
		<div class="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
			<div>
				<h3 class="text-xl font-bold text-gray-900">Booking Details</h3>
				<div class="mt-1.5"><Badge status={getStatusBadge(selectedBooking.status)}>{statusLabel(selectedBooking.status)}</Badge></div>
			</div>
			<button onclick={() => showDetails = false} class="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close"><X class="h-5 w-5" /></button>
		</div>

		<div class="flex-1 overflow-y-auto p-6 space-y-6">
			<div>
				<h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Patient Information</h4>
				<div class="space-y-4">
					<div class="flex items-start gap-3"><div class="p-2 rounded-xl bg-gray-100 flex-shrink-0"><User class="h-4 w-4 text-gray-500" /></div><div><div class="text-xs text-gray-500">Name</div><div class="font-medium text-gray-900">{selectedBooking.name}</div></div></div>
					<div class="flex items-start gap-3"><div class="p-2 rounded-xl bg-gray-100 flex-shrink-0"><Mail class="h-4 w-4 text-gray-500" /></div><div><div class="text-xs text-gray-500">Email</div><div class="font-medium text-gray-900">{selectedBooking.email}</div></div></div>
					<div class="flex items-start gap-3"><div class="p-2 rounded-xl bg-gray-100 flex-shrink-0"><Phone class="h-4 w-4 text-gray-500" /></div><div><div class="text-xs text-gray-500">Phone</div><div class="font-medium text-gray-900">{selectedBooking.phone}</div></div></div>
					<div class="flex items-start gap-3"><div class="p-2 rounded-xl bg-gray-100 flex-shrink-0"><MapPin class="h-4 w-4 text-gray-500" /></div><div><div class="text-xs text-gray-500">Address</div><div class="font-medium text-gray-900">{selectedBooking.address}</div></div></div>
				</div>
			</div>
			<div class="border-t border-gray-100 pt-6">
				<h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Appointment Details</h4>
				<div class="space-y-4">
					<div><div class="text-xs text-gray-500">Service</div><div class="font-medium text-gray-900 mt-0.5">{selectedBooking.service}</div></div>
					<div><div class="text-xs text-gray-500">Date & Time</div><div class="font-medium text-gray-900 mt-0.5">{formatDate(selectedBooking.dateTime)}</div></div>
					{#if selectedBooking.notes}<div><div class="text-xs text-gray-500">Notes</div><div class="mt-1.5 p-3 bg-gray-50 rounded-xl text-sm text-gray-800 leading-relaxed">{selectedBooking.notes}</div></div>{/if}
				</div>
			</div>
		</div>

		{#if selectedBooking.status !== 'COMPLETED'}
			<div class="p-6 border-t border-gray-200 flex-shrink-0">
				{#if selectedBooking.status === 'PENDING'}
					<Button variant="primary" fullWidth onclick={() => { updateStatus(selectedBooking!, 'CONFIRMED'); showDetails = false; }}>Confirm Booking</Button>
				{:else if selectedBooking.status === 'CONFIRMED'}
					<Button variant="primary" fullWidth onclick={() => { updateStatus(selectedBooking!, 'IN_PROGRESS'); showDetails = false; }}>Mark In Progress</Button>
				{:else if selectedBooking.status === 'IN_PROGRESS'}
					<Button variant="primary" fullWidth onclick={() => { updateStatus(selectedBooking!, 'COMPLETED'); showDetails = false; }}>Mark as Completed</Button>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<!-- ─── Edit Booking Drawer ─── -->
{#if showEditDrawer && editingBooking}
	<div transition:fade={{ duration: 200 }} class="fixed inset-0 bg-gray-900/50 z-[60]" onclick={() => showEditDrawer = false} role="button" tabindex="0"></div>
	<div transition:fly={{ x: 400, duration: 300, easing: cubicOut }} class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col">
		<div class="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
			<div>
				<h3 class="text-xl font-bold text-gray-900">Edit Booking</h3>
				<p class="text-sm text-gray-500 mt-0.5">{editingBooking.name}</p>
			</div>
			<button onclick={() => showEditDrawer = false} class="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close"><X class="h-5 w-5" /></button>
		</div>

		<div class="flex-1 overflow-y-auto">
			<form onsubmit={handleEditSubmit} class="p-6 space-y-5" id="edit-booking-form">
				<div>
					<label for="edit-service" class="block text-sm font-semibold text-gray-900 mb-2">Service</label>
					<CustomSelect
						id="edit-service"
						bind:value={editForm.service}
						options={services}
						variant="filter"
						placeholder="Choose a service..."
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="edit-date" class="block text-sm font-semibold text-gray-900 mb-2">Date</label>
						<DatePicker
							id="edit-date"
							bind:value={editForm.date}
							variant="filter"
							placeholder="Choose date..."
						/>
					</div>
					<div>
						<label for="edit-time" class="block text-sm font-semibold text-gray-900 mb-2">Time</label>
						<CustomSelect
							id="edit-time"
							bind:value={editForm.time}
							options={timeSlots}
							variant="filter"
							placeholder="Select time..."
						/>
					</div>
				</div>
				<div>
					<label for="edit-phone" class="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
					<input type="tel" id="edit-phone" bind:value={editForm.phone} required class="w-full rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20" />
				</div>
				<div>
					<label for="edit-address" class="block text-sm font-semibold text-gray-900 mb-2">Address</label>
					<input type="text" id="edit-address" bind:value={editForm.address} required class="w-full rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20" />
				</div>
				<div>
					<label for="edit-notes" class="block text-sm font-semibold text-gray-900 mb-2">Notes <span class="font-normal text-gray-400">(optional)</span></label>
					<textarea id="edit-notes" bind:value={editForm.notes} rows="3" placeholder="Any special instructions..." class="w-full rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20 resize-none"></textarea>
				</div>
			</form>
		</div>

		<div class="p-6 border-t border-gray-200 flex gap-3 flex-shrink-0">
			<Button type="submit" form="edit-booking-form" variant="primary" fullWidth loading={isSubmitting} loadingText="Saving...">Save Changes</Button>
			<Button type="button" variant="secondary" onclick={() => showEditDrawer = false}>Cancel</Button>
		</div>
	</div>
{/if}

<!-- ─── Delete Confirmation Modal ─── -->
{#if bookingToDelete}
	<div transition:fade={{ duration: 150 }} class="fixed inset-0 bg-gray-900/60 z-[80] flex items-center justify-center p-4">
		<div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
			<div class="flex items-center gap-4 mb-4">
				<div class="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
					<Trash2 class="h-6 w-6 text-red-600" />
				</div>
				<div>
					<h3 class="text-lg font-bold text-gray-900">Delete Booking</h3>
					<p class="text-sm text-gray-500">This action cannot be undone</p>
				</div>
			</div>
			<p class="text-sm text-gray-700 mb-6">
				Are you sure you want to delete the booking for
				<span class="font-semibold text-gray-900">{bookingToDelete.name}</span>
				(<span class="text-gray-600">{bookingToDelete.service}</span>)?
			</p>
			<div class="flex gap-3">
				<Button variant="secondary" fullWidth onclick={() => bookingToDelete = null} disabled={isDeleting}>Cancel</Button>
				<button
					onclick={confirmDelete}
					disabled={isDeleting}
					class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
				>
					{isDeleting ? 'Deleting…' : 'Delete'}
				</button>
			</div>
		</div>
	</div>
{/if}
