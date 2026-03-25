<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		LayoutDashboard,
		Calendar,
		Settings,
		MessageSquare,
		LogOut,
		Menu,
		X,
		User
	} from '@lucide/svelte';
	import { toasts } from '$lib/stores/toasts';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	let { data } = $props();

	let sidebarOpen = $state(false);
	let isLoggingOut = $state(false);
	let showLogoutConfirm = $state(false);

	const navigation = [
		{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
		{ name: 'Bookings', href: '/admin/bookings', icon: Calendar },
		{ name: 'Services', href: '/admin/services', icon: Settings },
		{ name: 'Feedback', href: '/admin/feedback', icon: MessageSquare },
	];

	function handleLogout() {
		showLogoutConfirm = true;
	}

	async function confirmLogout() {
		if (isLoggingOut) return;
		isLoggingOut = true;
		showLogoutConfirm = false;

		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			toasts.success('Logged out successfully');
			goto('/admin/login');
		} catch {
			toasts.error('Logout failed');
		} finally {
			isLoggingOut = false;
		}
	}
</script>

{#if $page.url.pathname === '/admin/login'}
	<!-- No layout for login page -->
	<slot />
{:else}
	<div class="min-h-screen bg-gray-50">
		<!-- Mobile sidebar backdrop -->
		{#if sidebarOpen}
			<div
				class="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
				onclick={() => sidebarOpen = false}
				role="button"
				tabindex="0"
			></div>
		{/if}

		<!-- Sidebar -->
		<aside
			class="fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
		>
			<!-- Logo -->
			<div class="h-16 flex items-center justify-between px-6 border-b border-gray-200">
				<div class="flex items-center gap-2">
					<img
						src="/images/logo/logo_trans_background.png"
						alt="SESI Logo"
						class="w-10 h-10 object-contain"
					/>
					<div class="flex flex-col leading-tight">
						<span class="font-bold text-gray-900 text-base">SESI</span>
						<span class="font-medium text-gray-600 text-xs">Administrator</span>
					</div>
				</div>
				<button
					onclick={() => sidebarOpen = false}
					class="lg:hidden p-2 rounded-lg hover:bg-gray-100"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Navigation -->
			<nav class="p-4 space-y-2">
				{#each navigation as item (item.href)}
					<a
						href={item.href}
						class="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors {
							$page.url.pathname === item.href
								? 'bg-[#1a5f4a] text-white'
								: 'text-gray-700 hover:bg-gray-100'
						}"
					>
						<svelte:component this={item.icon} class="h-5 w-5" />
						<span class="font-medium">{item.name}</span>
					</a>
				{/each}
			</nav>

			<!-- User section -->
			<div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
				<div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 mb-2">
					<img
						src="https://api.dicebear.com/7.x/adventurer/svg?seed={data.admin?.email || 'admin'}"
						alt="Avatar"
						class="w-10 h-10 rounded-full bg-white"
					/>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium text-gray-900 truncate">{data.admin?.name || 'Admin'}</p>
						<p class="text-xs text-gray-500 truncate">{data.admin?.email || ''}</p>
					</div>
				</div>
				<button
					onclick={handleLogout}
					disabled={isLoggingOut}
					class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
				>
					<LogOut class="h-5 w-5" />
					<span class="font-medium">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
				</button>
			</div>
		</aside>

		<!-- Main content -->
		<div class="lg:pl-64">
			<!-- Top header -->
			<header class="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
				<button
					onclick={() => sidebarOpen = true}
					class="lg:hidden p-2 rounded-lg hover:bg-gray-100"
				>
					<Menu class="h-6 w-6" />
				</button>

				<div class="flex-1 lg:flex-none">
					<h1 class="text-xl font-bold text-gray-900">
						{navigation.find(n => n.href === $page.url.pathname)?.name || 'Admin'}
					</h1>
				</div>

				<div class="hidden lg:block">
					<span class="text-sm text-gray-600">Welcome, {data.admin?.name || 'Admin'}</span>
				</div>
			</header>

			<!-- Page content -->
			<main class="p-6">
				<slot />
			</main>
		</div>
	</div>

	<ToastContainer />

	<!-- Logout Confirmation Modal -->
	{#if showLogoutConfirm}
		<div
			class="fixed inset-0 bg-gray-900/50 z-[80] flex items-center justify-center p-4"
			onclick={() => showLogoutConfirm = false}
			role="button"
			tabindex="0"
		>
			<div
				class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
				onclick={(e) => e.stopPropagation()}
				role="presentation"
			>
				<div class="flex items-center gap-3 mb-4">
					<div class="p-2.5 rounded-xl bg-red-100 flex-shrink-0">
						<LogOut class="h-5 w-5 text-red-600" />
					</div>
					<div>
						<h3 class="text-lg font-bold text-gray-900">Log out?</h3>
						<p class="text-sm text-gray-500">You'll need to sign in again to access the admin portal.</p>
					</div>
				</div>
				<div class="flex gap-3 mt-6">
					<button
						onclick={confirmLogout}
						disabled={isLoggingOut}
						class="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
					>
						{isLoggingOut ? 'Logging out...' : 'Yes, log out'}
					</button>
					<button
						onclick={() => showLogoutConfirm = false}
						class="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	{/if}
{/if}
