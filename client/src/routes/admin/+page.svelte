<script lang="ts">
	import { Calendar, Clock, CheckCircle, AlertCircle, TrendingUp, Users } from '@lucide/svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { onMount } from 'svelte';

	interface Booking {
		id: string;
		service: string;
		dateTime: string;
		name: string;
		status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
		createdAt: string;
	}

	interface Stats {
		total: number;
		pending: number;
		confirmed: number;
		completed: number;
		todayCount: number;
		thisWeekCount: number;
	}

	interface ServiceStat {
		service: string;
		count: number;
	}

	let stats = $state<Stats>({
		total: 0,
		pending: 0,
		confirmed: 0,
		completed: 0,
		todayCount: 0,
		thisWeekCount: 0
	});
	let recentBookings = $state<Booking[]>([]);
	let serviceStats = $state<ServiceStat[]>([]);
	let isLoading = $state(true);

	onMount(() => {
		loadDashboardData();
	});

	async function loadDashboardData() {
		isLoading = true;

		try {
			// Fetch all bookings to calculate stats
			const response = await fetch('/api/admin/bookings?limit=1000');
			const data = await response.json();

			if (response.ok) {
				const bookings = data.bookings;

				// Calculate stats
				const now = new Date();
				const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
				const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

				stats = {
					total: bookings.length,
					pending: bookings.filter((b: Booking) => b.status === 'PENDING').length,
					confirmed: bookings.filter((b: Booking) => b.status === 'CONFIRMED').length,
					completed: bookings.filter((b: Booking) => b.status === 'COMPLETED').length,
					todayCount: bookings.filter((b: Booking) => {
						const bookingDate = new Date(b.dateTime);
						return bookingDate >= today && bookingDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
					}).length,
					thisWeekCount: bookings.filter((b: Booking) => {
						const createdDate = new Date(b.createdAt);
						return createdDate >= weekAgo;
					}).length
				};

				// Get recent bookings
				recentBookings = bookings.slice(0, 10);

				// Calculate service stats
				const serviceCounts: Record<string, number> = {};
				bookings.forEach((b: Booking) => {
					serviceCounts[b.service] = (serviceCounts[b.service] || 0) + 1;
				});

				serviceStats = Object.entries(serviceCounts)
					.map(([service, count]) => ({ service, count }))
					.sort((a, b) => b.count - a.count)
					.slice(0, 5);
			}
		} catch (error) {
			console.error('Error loading dashboard data:', error);
		} finally {
			isLoading = false;
		}
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getStatusColor(status: string): 'default' | 'warning' | 'success' {
		if (status === 'PENDING') return 'warning';
		if (status === 'CONFIRMED') return 'default';
		return 'success';
	}
</script>

<svelte:head>
	<title>Dashboard - SES Admin</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div>
		<h2 class="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
		<p class="text-gray-600">Monitor your home care services at a glance</p>
	</div>

	{#if isLoading}
		<div class="p-12 text-center">
			<div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1a5f4a] border-r-transparent"></div>
			<p class="mt-4 text-gray-600">Loading dashboard...</p>
		</div>
	{:else}
		<!-- Stats Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- Total Bookings -->
			<div class="bg-white rounded-2xl shadow-sm p-6">
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<p class="text-sm font-medium text-gray-600">Total Bookings</p>
						<p class="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
						<p class="text-xs text-gray-500 mt-2">All time</p>
					</div>
					<div class="p-3 bg-blue-50 rounded-xl">
						<Calendar class="h-6 w-6 text-blue-600" />
					</div>
				</div>
			</div>

			<!-- Pending -->
			<div class="bg-white rounded-2xl shadow-sm p-6">
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<p class="text-sm font-medium text-gray-600">Pending</p>
						<p class="text-3xl font-bold text-orange-600 mt-2">{stats.pending}</p>
						<p class="text-xs text-gray-500 mt-2">Awaiting confirmation</p>
					</div>
					<div class="p-3 bg-orange-50 rounded-xl">
						<AlertCircle class="h-6 w-6 text-orange-600" />
					</div>
				</div>
			</div>

			<!-- Confirmed -->
			<div class="bg-white rounded-2xl shadow-sm p-6">
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<p class="text-sm font-medium text-gray-600">Confirmed</p>
						<p class="text-3xl font-bold text-blue-600 mt-2">{stats.confirmed}</p>
						<p class="text-xs text-gray-500 mt-2">Scheduled</p>
					</div>
					<div class="p-3 bg-blue-50 rounded-xl">
						<Clock class="h-6 w-6 text-blue-600" />
					</div>
				</div>
			</div>

			<!-- Completed -->
			<div class="bg-white rounded-2xl shadow-sm p-6">
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<p class="text-sm font-medium text-gray-600">Completed</p>
						<p class="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
						<p class="text-xs text-gray-500 mt-2">Finished</p>
					</div>
					<div class="p-3 bg-green-50 rounded-xl">
						<CheckCircle class="h-6 w-6 text-green-600" />
					</div>
				</div>
			</div>
		</div>

		<!-- Secondary Stats -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Today's Appointments -->
			<div class="bg-linear-to-br from-[#1a5f4a] to-[#0d3d2d] rounded-2xl shadow-sm p-6 text-white">
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<p class="text-sm font-medium text-white/80">Today's Appointments</p>
						<p class="text-4xl font-bold mt-2">{stats.todayCount}</p>
						<p class="text-xs text-white/60 mt-2">Scheduled for today</p>
					</div>
					<div class="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
						<TrendingUp class="h-6 w-6 text-white" />
					</div>
				</div>
			</div>

			<!-- This Week -->
			<div class="bg-linear-to-br from-[#4caf50] to-[#2e7d32] rounded-2xl shadow-sm p-6 text-white">
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<p class="text-sm font-medium text-white/80">This Week</p>
						<p class="text-4xl font-bold mt-2">{stats.thisWeekCount}</p>
						<p class="text-xs text-white/60 mt-2">New bookings (last 7 days)</p>
					</div>
					<div class="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
						<Users class="h-6 w-6 text-white" />
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Recent Bookings -->
			<div class="bg-white rounded-2xl shadow-sm overflow-hidden">
				<div class="p-6 border-b border-gray-200">
					<h3 class="text-lg font-bold text-gray-900">Recent Bookings</h3>
					<p class="text-sm text-gray-600">Latest appointments</p>
				</div>
				<div class="divide-y divide-gray-200">
					{#if recentBookings.length === 0}
						<div class="p-6 text-center text-gray-500">
							No bookings yet
						</div>
					{:else}
						{#each recentBookings as booking (booking.id)}
							<div class="p-4 hover:bg-gray-50 transition-colors">
								<div class="flex justify-between items-start gap-4">
									<div class="flex-1 min-w-0">
										<p class="font-medium text-gray-900 truncate">{booking.name}</p>
										<p class="text-sm text-gray-600 truncate">{booking.service}</p>
										<p class="text-xs text-gray-500 mt-1">{formatDate(booking.dateTime)}</p>
									</div>
									<Badge variant={getStatusColor(booking.status)}>
										{booking.status}
									</Badge>
								</div>
							</div>
						{/each}
					{/if}
				</div>
				{#if recentBookings.length > 0}
					<div class="p-4 border-t border-gray-200 text-center">
						<a href="/admin/bookings" class="text-sm text-[#1a5f4a] hover:text-[#0d3d2d] font-medium">
							View all bookings →
						</a>
					</div>
				{/if}
			</div>

			<!-- Popular Services -->
			<div class="bg-white rounded-2xl shadow-sm overflow-hidden">
				<div class="p-6 border-b border-gray-200">
					<h3 class="text-lg font-bold text-gray-900">Popular Services</h3>
					<p class="text-sm text-gray-600">Most requested services</p>
				</div>
				<div class="p-6 space-y-4">
					{#if serviceStats.length === 0}
						<div class="text-center text-gray-500">
							No service data yet
						</div>
					{:else}
						{#each serviceStats as stat, index (stat.service)}
							<div class="flex items-center gap-4">
								<div class="flex-shrink-0 w-8 h-8 bg-[#1a5f4a] text-white rounded-lg flex items-center justify-center font-bold text-sm">
									{index + 1}
								</div>
								<div class="flex-1 min-w-0">
									<p class="font-medium text-gray-900 truncate">{stat.service}</p>
									<div class="mt-1 bg-gray-100 rounded-full h-2 overflow-hidden">
										<div
											class="bg-[#1a5f4a] h-full rounded-full transition-all"
											style="width: {(stat.count / stats.total) * 100}%"
										></div>
									</div>
								</div>
								<div class="flex-shrink-0 text-sm font-semibold text-gray-900">
									{stat.count}
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
