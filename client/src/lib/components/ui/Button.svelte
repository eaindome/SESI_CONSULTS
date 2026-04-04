<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';

	// Declare slots for TypeScript
	export interface $$Slots {
		default: unknown;
		icon?: unknown;
	}

	

	// Types
	type Variant =
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'outline'
		| 'ghost'
		| 'inverse'
		| 'inverse-outline';
	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	type Shape = 'rounded' | 'pill' | 'square';

	// Props
	let {
		variant = 'primary',
		size = 'md',
		shape = 'rounded',
		disabled = false,
		loading = false,
		loadingText = 'Loading...',
		showLoadingText = true,
		type = 'button',
		fullWidth = false,
		icon = null,
		iconPosition = 'left',
		elevation = false,
		animateOnHover = true,
		href = null,
		...restProps
	}: {
		variant?: Variant;
		size?: Size;
		shape?: Shape;
		disabled?: boolean;
		loading?: boolean;
		loadingText?: string;
		showLoadingText?: boolean;
		type?: 'button' | 'submit' | 'reset';
		fullWidth?: boolean;
		icon?: ComponentType<SvelteComponent> | null;
		iconPosition?: 'left' | 'right';
		elevation?: boolean;
		animateOnHover?: boolean;
		href?: string | null;
		[key: string]: unknown;
	} = $props();

	// Element reference
	let isPressed = $state(false);
	let isHovered = $state(false);

	// Base variant classes with SES emerald/teal colors
	const variantClasses: Record<Variant, string> = {
		primary: 'bg-[#1a5f4a] hover:bg-[#0d3d2d] active:bg-[#0a2e1e] text-white',
		secondary: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white',
		success: 'bg-[#4caf50] hover:bg-[#1a5f4a] active:bg-[#3d9142] text-white',
		danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white',
		outline: 'bg-white border-2 border-[#1a5f4a] text-[#1a5f4a] hover:bg-[#1a5f4a]/5 active:bg-[#1a5f4a]/10',
		ghost: 'bg-transparent text-[#1a5f4a] hover:bg-[#1a5f4a]/5 active:bg-[#1a5f4a]/10',
		inverse: 'bg-white text-[#1a5f4a] hover:bg-gray-100 active:bg-gray-200',
		'inverse-outline': 'bg-transparent border-2 border-white text-white hover:bg-white/10 active:bg-white/20'
	};

	// Size classes with better proportions
	const sizeClasses: Record<Size, string> = {
		xs: 'text-xs py-1 px-2 h-6',
		sm: 'text-sm py-1.5 px-3 h-8',
		md: 'text-base py-2 px-4 h-10',
		lg: 'text-lg py-2.5 px-5 h-12',
		xl: 'text-xl py-3 px-6 h-14'
	};

	// Shape classes
	const shapeClasses: Record<Shape, string> = {
		rounded: 'rounded-xl',
		pill: 'rounded-full',
		square: 'rounded-none'
	};

	// Dynamic classes based on props
	const classes = $derived(`
	  ${variantClasses[variant]}
	  ${sizeClasses[size]}
	  ${shapeClasses[shape]}
	  ${fullWidth ? 'w-full' : ''}
	  ${elevation && !disabled ? 'shadow-sm hover:shadow-md active:shadow-sm' : ''}
	  font-semibold
	  transition-all duration-300 ease-in-out
	  focus:outline-none focus:ring-4 focus:ring-[#1a5f4a]/20
	  ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
	  ${loading ? 'relative' : ''}
	  relative overflow-hidden
	  flex items-center justify-center gap-2
	`);

	// Handle mouse events
	function handleMouseUp() {
		isPressed = false;
	}

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
		isPressed = false;
	}

	// Handle custom click event
	function handleClick(event: MouseEvent) {
		if (disabled || loading) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	// Component to render (button or anchor)
	// svelte-ignore state_referenced_locally
	const Component = href ? 'a' : 'button';
</script>

<svelte:element
	this={Component}
	{href}
	type={href ? undefined : type}
	disabled={href ? undefined : disabled}
	class={classes}
	onclick={handleClick}
	onmouseup={handleMouseUp}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	{...restProps}
>
	<div class="relative flex h-full w-full items-center justify-center gap-2">
		{#if loading}
			<div class="flex items-center justify-center transition-opacity duration-300">
				<svg
					class="mr-2 h-4 w-4 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				{#if showLoadingText}
					<span>{loadingText}</span>
				{/if}
			</div>
		{:else}
			<div
				class="flex items-center gap-2 transition-all duration-300 {animateOnHover && !disabled
					? isPressed
						? 'scale-95'
						: isHovered
							? 'scale-105'
							: 'scale-100'
					: 'scale-100'}"
			>
				{#if icon && iconPosition === 'left'}
					<span
						class="h-5 w-5 transition-transform duration-300 {isHovered
							? '-translate-x-0.5'
							: ''}"
					>
						{#if typeof icon === 'function'}
							<icon class="h-5 w-5"></icon>
						{/if}
					</span>
				{/if}

				<!-- svelte-ignore slot_element_deprecated -->
				<span>
					<slot />
				</span>

				{#if icon && iconPosition === 'right'}
					<span
						class="h-5 w-5 transition-transform duration-300 {isHovered
							? 'translate-x-0.5'
							: ''}"
					>
						{#if typeof icon === 'function'}
							<icon class="h-5 w-5"></icon>
						{/if}
					</span>
				{/if}
			</div>
		{/if}
	</div>
</svelte:element>

<style>
	/* Ensure disabled buttons don't transform */
	:global(button:disabled),
	:global(a[disabled]) {
		transform: scale(1) !important;
		box-shadow: none !important;
	}
</style>
