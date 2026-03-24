<script lang="ts">
	import { goto } from '$app/navigation';
	import { Lock, Mail } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { toasts } from '$lib/stores/toasts';

	let email = $state('');
	let password = $state('');
	let isSubmitting = $state(false);

	async function handleLogin(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Login failed');
			}

			toasts.success('Welcome back!');
			goto('/admin');
		} catch (error: any) {
			toasts.error(error.message || 'Invalid credentials');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Login - SESI Homecare</title>
</svelte:head>

<div class="min-h-screen bg-linear-to-br from-[#1a5f4a] to-[#0d3d2d] flex items-center justify-center p-6">
	<!-- Decorative elements -->
	<div class="absolute top-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
	<div class="absolute bottom-10 left-20 w-80 h-80 bg-[#4caf50]/10 rounded-full blur-3xl"></div>

	<div class="relative w-full max-w-md">
		<!-- Logo/Brand -->
		<div class="text-center mb-8">
			<div class="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
				<div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
					<Lock class="h-6 w-6 text-[#1a5f4a]" />
				</div>
			</div>
			<h1 class="text-3xl font-bold text-white mb-2">Admin Portal</h1>
			<p class="text-white/80">Sign in to manage your homecare services</p>
		</div>

		<!-- Login Card -->
		<div class="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
			<form onsubmit={handleLogin} class="space-y-6">
				<!-- Email -->
				<div>
					<label for="email" class="flex items-center text-sm font-semibold text-gray-900 mb-3">
						<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3">
							<Mail class="h-4 w-4 text-[#1a5f4a]" />
						</div>
						Email Address
					</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						required
						placeholder="admin@sesi.com"
						class="w-full rounded-2xl bg-gray-50 hover:bg-gray-100 focus:bg-white px-5 py-4 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg border-0"
					/>
				</div>

				<!-- Password -->
				<div>
					<label for="password" class="flex items-center text-sm font-semibold text-gray-900 mb-3">
						<div class="p-2 rounded-xl bg-[#1a5f4a]/10 mr-3">
							<Lock class="h-4 w-4 text-[#1a5f4a]" />
						</div>
						Password
					</label>
					<input
						type="password"
						id="password"
						bind:value={password}
						required
						placeholder="Enter your password"
						class="w-full rounded-2xl bg-gray-50 hover:bg-gray-100 focus:bg-white px-5 py-4 text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg border-0"
					/>
				</div>

				<!-- Submit Button -->
				<div class="pt-4">
					<Button
						type="submit"
						variant="primary"
						size="lg"
						fullWidth
						loading={isSubmitting}
						loadingText="Signing in..."
						disabled={isSubmitting}
						elevation
					>
						Sign In
					</Button>
				</div>
			</form>

			<div class="mt-6 text-center">
				<a href="/" class="text-sm text-gray-600 hover:text-[#1a5f4a] transition-colors">
					← Back to website
				</a>
			</div>
		</div>

		<!-- Footer note -->
		<p class="text-center text-white/60 text-sm mt-6">
			Default credentials: admin@sesi.com / admin123
		</p>
	</div>
</div>
