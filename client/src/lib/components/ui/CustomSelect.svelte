<script lang="ts">
	import { ChevronDown, Check } from '@lucide/svelte';

	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		value?: string;
		options: (Option | string)[];
		placeholder?: string;
		disabled?: boolean;
		id?: string;
		/** 'form' = large padded (public forms), 'filter' = compact (admin filters) */
		variant?: 'form' | 'filter';
		onchange?: (value: string) => void;
	}

	let {
		value = $bindable(''),
		options,
		placeholder = 'Select...',
		disabled = false,
		id,
		variant = 'form',
		onchange
	}: Props = $props();

	let open = $state(false);
	let containerEl: HTMLElement;

	const normalizedOptions = $derived(
		options.map(o => (typeof o === 'string' ? { value: o, label: o } : o))
	);

	const selectedLabel = $derived(
		normalizedOptions.find(o => o.value === value)?.label ?? ''
	);

	function select(val: string) {
		value = val;
		onchange?.(val);
		open = false;
	}

	function handleWindowClick(e: MouseEvent) {
		if (containerEl && !containerEl.contains(e.target as Node)) {
			open = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}

	const triggerBase = $derived(
		variant === 'form'
			? 'w-full flex items-center justify-between rounded-2xl bg-gray-50 hover:bg-gray-100 focus:bg-white px-5 py-4 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20 focus:shadow-lg border-0'
			: 'w-full flex items-center justify-between rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20 border-0'
	);
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleKeydown} />

<div bind:this={containerEl} class="relative">
	<button
		type="button"
		{id}
		{disabled}
		onclick={() => { if (!disabled) open = !open; }}
		class="{triggerBase} {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
		aria-haspopup="listbox"
		aria-expanded={open}
	>
		<span class="{value ? 'text-gray-900' : 'text-gray-400'} text-sm">
			{selectedLabel || placeholder}
		</span>
		<ChevronDown
			class="h-4 w-4 text-gray-500 flex-shrink-0 ml-2 transition-transform duration-200 {open ? 'rotate-180' : ''}"
		/>
	</button>

	{#if open}
		<div
			role="listbox"
			class="absolute z-50 mt-1.5 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
		>
			<div class="max-h-64 overflow-y-auto py-1.5">
				<!-- Placeholder / clear option -->
				<button
					type="button"
					role="option"
					aria-selected={value === ''}
					onclick={() => select('')}
					class="w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors {
						value === ''
							? 'bg-[#1a5f4a]/10 text-[#1a5f4a] font-medium'
							: 'text-gray-400 hover:bg-[#1a5f4a]/5 hover:text-[#1a5f4a]'
					}"
				>
					<span>{placeholder}</span>
					{#if value === ''}
						<Check class="h-4 w-4 text-[#1a5f4a]" />
					{/if}
				</button>
				<div class="mx-3 border-t border-gray-100 my-1"></div>
				{#each normalizedOptions as option (option.value)}
					<button
						type="button"
						role="option"
						aria-selected={value === option.value}
						onclick={() => select(option.value)}
						class="w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors {
							value === option.value
								? 'bg-[#1a5f4a]/10 text-[#1a5f4a] font-medium'
								: 'text-gray-700 hover:bg-[#1a5f4a]/5 hover:text-[#1a5f4a]'
						}"
					>
						<span>{option.label}</span>
						{#if value === option.value}
							<Check class="h-4 w-4 text-[#1a5f4a]" />
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
