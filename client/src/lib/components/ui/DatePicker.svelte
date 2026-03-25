<script lang="ts">
	import { Calendar, ChevronLeft, ChevronRight } from '@lucide/svelte';

	interface Props {
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		id?: string;
		/** Earliest selectable date — ISO string (YYYY-MM-DD) */
		min?: string;
		/** Latest selectable date — ISO string (YYYY-MM-DD) */
		max?: string;
		/** 'form' = large padded (public forms), 'filter' = compact (admin filters) */
		variant?: 'form' | 'filter';
		onchange?: (value: string) => void;
	}

	let {
		value = $bindable(''),
		placeholder = 'Select date...',
		disabled = false,
		id,
		min,
		max,
		variant = 'form',
		onchange
	}: Props = $props();

	let open = $state(false);
	let containerEl: HTMLElement;

	const MONTHS = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];
	const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	function parseIso(s: string): Date | null {
		if (!s) return null;
		const [y, m, d] = s.split('-').map(Number);
		return new Date(y, m - 1, d);
	}

	function toIso(d: Date): string {
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	}

	const _now = new Date();
	let viewYear = $state(_now.getFullYear());
	let viewMonth = $state(_now.getMonth());

	// Keep the calendar view in sync when value is set externally
	$effect(() => {
		const d = parseIso(value);
		if (d) {
			viewYear = d.getFullYear();
			viewMonth = d.getMonth();
		}
	});

	const selectedDate = $derived(parseIso(value));
	const minDate = $derived(min ? parseIso(min) : null);
	const maxDate = $derived(max ? parseIso(max) : null);
	const todayDate = $derived(new Date(_now.getFullYear(), _now.getMonth(), _now.getDate()));

	const displayValue = $derived.by(() => {
		if (!selectedDate) return '';
		return `${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
	});

	const calendarCells = $derived.by(() => {
		const firstDow = new Date(viewYear, viewMonth, 1).getDay();
		const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
		const cells: (number | null)[] = Array(firstDow).fill(null);
		for (let d = 1; d <= daysInMonth; d++) cells.push(d);
		// Pad to full rows so the grid stays stable
		while (cells.length % 7 !== 0) cells.push(null);
		return cells;
	});

	function dayDisabled(day: number): boolean {
		const d = new Date(viewYear, viewMonth, day);
		if (minDate && d < minDate) return true;
		if (maxDate && d > maxDate) return true;
		return false;
	}

	function daySelected(day: number): boolean {
		return (
			selectedDate?.getFullYear() === viewYear &&
			selectedDate?.getMonth() === viewMonth &&
			selectedDate?.getDate() === day
		);
	}

	function dayIsToday(day: number): boolean {
		return (
			todayDate.getFullYear() === viewYear &&
			todayDate.getMonth() === viewMonth &&
			todayDate.getDate() === day
		);
	}

	function selectDay(day: number) {
		if (dayDisabled(day)) return;
		value = toIso(new Date(viewYear, viewMonth, day));
		onchange?.(value);
		open = false;
	}

	function prevMonth() {
		if (viewMonth === 0) { viewYear--; viewMonth = 11; }
		else viewMonth--;
	}

	function nextMonth() {
		if (viewMonth === 11) { viewYear++; viewMonth = 0; }
		else viewMonth++;
	}

	function handleWindowClick(e: MouseEvent) {
		if (containerEl && !containerEl.contains(e.target as Node)) open = false;
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
	<!-- Trigger -->
	<button
		type="button"
		{id}
		{disabled}
		onclick={() => { if (!disabled) open = !open; }}
		class="{triggerBase} {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
		aria-haspopup="dialog"
		aria-expanded={open}
	>
		<span class="{value ? 'text-gray-900' : 'text-gray-400'} text-sm">
			{displayValue || placeholder}
		</span>
		<Calendar class="h-4 w-4 text-gray-500 flex-shrink-0 ml-2 transition-transform duration-200 {open ? 'text-[#1a5f4a]' : ''}" />
	</button>

	{#if open}
		<div
			role="dialog"
			aria-label="Date picker"
			class="absolute z-50 mt-1.5 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
			style="min-width: 280px; width: 100%;"
		>
			<!-- Month / year navigation -->
			<div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
				<button
					type="button"
					onclick={prevMonth}
					class="p-1.5 rounded-xl hover:bg-[#1a5f4a]/10 text-gray-500 hover:text-[#1a5f4a] transition-colors"
					aria-label="Previous month"
				>
					<ChevronLeft class="h-4 w-4" />
				</button>
				<span class="text-sm font-semibold text-gray-800 select-none">
					{MONTHS[viewMonth]} {viewYear}
				</span>
				<button
					type="button"
					onclick={nextMonth}
					class="p-1.5 rounded-xl hover:bg-[#1a5f4a]/10 text-gray-500 hover:text-[#1a5f4a] transition-colors"
					aria-label="Next month"
				>
					<ChevronRight class="h-4 w-4" />
				</button>
			</div>

			<!-- Day-of-week headers -->
			<div class="grid grid-cols-7 px-3 pt-3 pb-1">
				{#each DAY_HEADERS as label}
					<div class="text-center text-xs font-medium text-gray-400 pb-1 select-none">{label}</div>
				{/each}
			</div>

			<!-- Calendar grid -->
			<div class="grid grid-cols-7 px-3 pb-3 gap-y-1">
				{#each calendarCells as day}
					{#if day === null}
						<div></div>
					{:else}
						<button
							type="button"
							onclick={() => selectDay(day)}
							disabled={dayDisabled(day)}
							class="aspect-square w-full flex items-center justify-center rounded-xl text-sm transition-colors select-none
								{daySelected(day)
									? 'bg-[#1a5f4a] text-white font-semibold'
									: dayIsToday(day)
									? 'bg-[#1a5f4a]/10 text-[#1a5f4a] font-semibold'
									: 'text-gray-700 hover:bg-[#1a5f4a]/10 hover:text-[#1a5f4a]'}
								{dayDisabled(day) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}"
						>
							{day}
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
