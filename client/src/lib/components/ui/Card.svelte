<script lang="ts">
	// Props
	let {
		padding = 'md',
		shadow = 'sm',
		border = true,
		hoverable = false,
		clickable = false,
		href = null,
		class: className = '',
		...restProps
	}: {
		padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
		shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
		border?: boolean;
		hoverable?: boolean;
		clickable?: boolean;
		href?: string | null;
		class?: string;
		[key: string]: any;
	} = $props();

	// Padding classes
	const paddingClasses = {
		none: '',
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-6',
		xl: 'p-8'
	};

	// Shadow classes
	const shadowClasses = {
		none: '',
		sm: 'shadow-sm',
		md: 'shadow-md',
		lg: 'shadow-lg',
		xl: 'shadow-xl'
	};

	// Dynamic classes based on props
	const classes = $derived(`
		${paddingClasses[padding]}
		${shadowClasses[shadow]}
		${border ? 'border border-gray-200' : ''}
		${hoverable ? 'hover:shadow-xl hover:border-[#1a5f4a]/20 transition-all duration-300 hover:-translate-y-1' : ''}
		${clickable ? 'cursor-pointer' : ''}
		bg-white rounded-xl overflow-hidden
		${className}
	`);

	// Component to render (div or anchor)
	const Component = href ? 'a' : 'div';
</script>

<svelte:element
	this={Component}
	{href}
	class={classes}
	{...restProps}
	role={clickable ? 'button' : undefined}
	tabindex={clickable ? 0 : undefined}
>
	<slot />
</svelte:element>
