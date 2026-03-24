<script lang="ts">
	import { Settings, Plus, Edit2, Trash2, X, Check, MoreVertical, Eye, EyeOff } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { toasts } from '$lib/stores/toasts';
	import { onMount } from 'svelte';

	interface Service {
		id: string;
		name: string;
		description: string;
		price?: string;
		features: string[];
		enabled: boolean;
		displayOrder: number;
		createdAt: string;
		updatedAt: string;
	}

	let services = $state<Service[]>([]);
	let isLoading = $state(false);
	let showModal = $state(false);
	let editingService = $state<Service | null>(null);
	let openMenuId = $state<string | null>(null);

	// Form state
	let form = $state({
		name: '',
		description: '',
		features: [''],
		enabled: true,
		displayOrder: 0
	});

	onMount(() => {
		loadServices();
	});

	async function loadServices() {
		isLoading = true;

		try {
			const response = await fetch('/api/admin/services');
			const data = await response.json();

			if (response.ok) {
				services = data;
			} else {
				toasts.error('Failed to load services');
			}
		} catch (error) {
			toasts.error('Error loading services');
		} finally {
			isLoading = false;
		}
	}

	function openCreateModal() {
		editingService = null;
		form = {
			name: '',
			description: '',
			features: [''],
			enabled: true,
			displayOrder: services.length + 1
		};
		showModal = true;
	}

	function openEditModal(service: Service) {
		editingService = service;
		form = {
			name: service.name,
			description: service.description,
			features: service.features.length > 0 ? [...service.features] : [''],
			enabled: service.enabled,
			displayOrder: service.displayOrder
		};
		showModal = true;
	}

	function addFeature() {
		form.features = [...form.features, ''];
	}

	function removeFeature(index: number) {
		form.features = form.features.filter((_, i) => i !== index);
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		// Filter out empty features
		const features = form.features.filter(f => f.trim() !== '');

		const data = {
			name: form.name,
			description: form.description,
			features,
			enabled: form.enabled,
			displayOrder: form.displayOrder
		};

		try {
			let response;

			if (editingService) {
				response = await fetch('/api/admin/services', {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: editingService.id, ...data })
				});
			} else {
				response = await fetch('/api/admin/services', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data)
				});
			}

			if (response.ok) {
				toasts.success(editingService ? 'Service updated' : 'Service created');
				showModal = false;
				loadServices();
			} else {
				toasts.error('Failed to save service');
			}
		} catch (error) {
			toasts.error('Error saving service');
		}
	}

	async function toggleEnabled(service: Service) {
		try {
			const response = await fetch('/api/admin/services', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: service.id, enabled: !service.enabled })
			});

			if (response.ok) {
				toasts.success(service.enabled ? 'Service disabled' : 'Service enabled');
				loadServices();
			} else {
				toasts.error('Failed to update service');
			}
		} catch (error) {
			toasts.error('Error updating service');
		}
	}

	async function deleteService(service: Service) {
		if (!confirm(`Delete "${service.name}"? This action cannot be undone.`)) return;

		try {
			const response = await fetch('/api/admin/services', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: service.id })
			});

			if (response.ok) {
				toasts.success('Service deleted');
				loadServices();
			} else {
				toasts.error('Failed to delete service');
			}
		} catch (error) {
			toasts.error('Error deleting service');
		}
		openMenuId = null;
	}

	function toggleMenu(serviceId: string) {
		openMenuId = openMenuId === serviceId ? null : serviceId;
	}

	// Close menu when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.menu-container')) {
			openMenuId = null;
		}
	}
</script>

<svelte:head>
	<title>Services Management - SESI Admin</title>
</svelte:head>

<svelte:window onclick={handleClickOutside} />

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
		<div>
			<h2 class="text-2xl font-bold text-gray-900">Services Management</h2>
			<p class="text-gray-600">Manage your home care service offerings</p>
		</div>
		<button
			onclick={openCreateModal}
			class="inline-flex items-center gap-2 px-6 py-3 bg-[#1a5f4a] hover:bg-[#0d3d2d] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
		>
			<Plus class="h-5 w-5" />
			<span>Add Service</span>
		</button>
	</div>

	<!-- Services List -->
	<div class="bg-white rounded-2xl shadow-sm overflow-hidden">
		{#if isLoading}
			<div class="p-12 text-center">
				<div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1a5f4a] border-r-transparent"></div>
				<p class="mt-4 text-gray-600">Loading services...</p>
			</div>
		{:else if services.length === 0}
			<div class="p-12 text-center">
				<Settings class="h-12 w-12 text-gray-300 mx-auto mb-4" />
				<p class="text-gray-600">No services found</p>
				<Button variant="secondary" size="sm" onclick={openCreateModal} class="mt-4">
					Create your first service
				</Button>
			</div>
		{:else}
			<!-- Grid View -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
				{#each services as service (service.id)}
					<div class="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
						<!-- Header with badge and menu -->
						<div class="p-6 pb-4">
							<div class="flex items-start justify-between mb-3">
								<Badge variant={service.enabled ? 'success' : 'default'}>
									{service.enabled ? 'Active' : 'Disabled'}
								</Badge>

								<!-- Kebab Menu -->
								<div class="relative menu-container">
									<button
										onclick={(e) => { e.stopPropagation(); toggleMenu(service.id); }}
										class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
										aria-label="Options"
									>
										<MoreVertical class="h-5 w-5 text-gray-600" />
									</button>

									{#if openMenuId === service.id}
										<div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
											<div class="py-2">
												<button
													onclick={() => { toggleEnabled(service); openMenuId = null; }}
													class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
												>
													{#if service.enabled}
														<EyeOff class="h-4 w-4 text-gray-600" />
														<span>Disable</span>
													{:else}
														<Eye class="h-4 w-4 text-gray-600" />
														<span>Enable</span>
													{/if}
												</button>
												<button
													onclick={() => { openEditModal(service); openMenuId = null; }}
													class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
												>
													<Edit2 class="h-4 w-4 text-gray-600" />
													<span>Edit</span>
												</button>
												<hr class="my-2 border-gray-200" />
												<button
													onclick={() => deleteService(service)}
													class="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-3"
												>
													<Trash2 class="h-4 w-4" />
													<span>Delete</span>
												</button>
											</div>
										</div>
									{/if}
								</div>
							</div>

							<h3 class="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
						</div>

						<!-- Description -->
						<div class="px-6 pb-4">
							<p class="text-sm text-gray-600 line-clamp-3">{service.description}</p>
						</div>

						<!-- Features -->
						{#if service.features.length > 0}
							<div class="px-6 pb-6">
								<div class="space-y-2">
									{#each service.features.slice(0, 3) as feature (feature)}
										<div class="flex items-start gap-2 text-sm text-gray-700">
											<Check class="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
											<span class="line-clamp-1">{feature}</span>
										</div>
									{/each}
									{#if service.features.length > 3}
										<p class="text-xs text-gray-500 ml-6">+{service.features.length - 3} more features</p>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<!-- Service Modal -->
{#if showModal}
	<div
		class="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4"
		onclick={() => showModal = false}
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
					<h3 class="text-xl font-bold text-gray-900">
						{editingService ? 'Edit Service' : 'New Service'}
					</h3>
					<p class="text-sm text-gray-600 mt-1">
						{editingService ? 'Update service details' : 'Add a new home care service'}
					</p>
				</div>
				<button
					onclick={() => showModal = false}
					class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<form onsubmit={handleSubmit} class="p-6 space-y-6">
				<!-- Name -->
				<div>
					<label for="name" class="block text-sm font-semibold text-gray-900 mb-2">
						Service Name
					</label>
					<input
						type="text"
						id="name"
						bind:value={form.name}
						required
						placeholder="e.g., General Nursing Care"
						class="w-full rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20"
					/>
				</div>

				<!-- Description -->
				<div>
					<label for="description" class="block text-sm font-semibold text-gray-900 mb-2">
						Description
					</label>
					<textarea
						id="description"
						bind:value={form.description}
						required
						rows="3"
						placeholder="Detailed description of the service..."
						class="w-full rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20 resize-none"
					></textarea>
				</div>

				<!-- Features -->
				<div>
					<label class="block text-sm font-semibold text-gray-900 mb-2">
						Features
					</label>
					<div class="space-y-3">
						{#each form.features as feature, index (index)}
							<div class="flex gap-2">
								<input
									type="text"
									bind:value={form.features[index]}
									placeholder="Feature description..."
									class="flex-1 rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20"
								/>
								{#if form.features.length > 1}
									<button
										type="button"
										onclick={() => removeFeature(index)}
										class="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
									>
										<Trash2 class="h-5 w-5" />
									</button>
								{/if}
							</div>
						{/each}
						<Button type="button" variant="secondary" size="sm" onclick={addFeature}>
							<Plus class="h-4 w-4 mr-2" />
							Add Feature
						</Button>
					</div>
				</div>

				<!-- Display Order & Enabled -->
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="displayOrder" class="block text-sm font-semibold text-gray-900 mb-2">
							Display Order
						</label>
						<input
							type="number"
							id="displayOrder"
							bind:value={form.displayOrder}
							required
							min="0"
							class="w-full rounded-xl bg-gray-50 px-4 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20"
						/>
					</div>

					<div>
						<label class="block text-sm font-semibold text-gray-900 mb-2">
							Status
						</label>
						<label class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
							<input
								type="checkbox"
								bind:checked={form.enabled}
								class="w-5 h-5 text-[#1a5f4a] rounded focus:ring-2 focus:ring-[#1a5f4a]/20"
							/>
							<span class="text-sm font-medium text-gray-900">
								{form.enabled ? 'Active' : 'Disabled'}
							</span>
						</label>
					</div>
				</div>

				<!-- Actions -->
				<div class="flex gap-3 pt-4">
					<Button type="submit" variant="primary" fullWidth>
						{editingService ? 'Update Service' : 'Create Service'}
					</Button>
					<Button type="button" variant="secondary" onclick={() => showModal = false}>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	</div>
{/if}
