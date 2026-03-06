<script lang="ts">
	// Props
	let {
		status = 'neutral',
		size = 'md',
		outline = false,
		...restProps
	}: {
		status?: 'safe' | 'warning' | 'info' | 'neutral';
		size?: 'sm' | 'md' | 'lg';
		outline?: boolean;
		[key: string]: any;
	} = $props();

	// Status classes with TMT trustGreen as primary
	const statusClasses = {
		safe: outline
			? 'border-2 border-[#1a5f4a] text-[#1a5f4a] bg-white'
			: 'bg-[#1a5f4a]/10 text-[#1a5f4a] border border-[#1a5f4a]/20',
		warning: outline
			? 'border-2 border-yellow-500 text-yellow-700 bg-white'
			: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
		info: outline
			? 'border-2 border-[#0288d1] text-[#0288d1] bg-white'
			: 'bg-[#0288d1]/10 text-[#0288d1] border border-[#0288d1]/20',
		neutral: outline
			? 'border-2 border-gray-400 text-gray-700 bg-white'
			: 'bg-gray-100 text-gray-700 border border-gray-200'
	};

	// Size classes
	const sizeClasses = {
		sm: 'text-xs px-2 py-0.5',
		md: 'text-sm px-3 py-1',
		lg: 'text-base px-4 py-1.5'
	};

	// Dynamic classes based on props
	const classes = $derived(`
		${statusClasses[status]}
		${sizeClasses[size]}
		inline-flex items-center justify-center
		rounded-full font-medium
		transition-all duration-200
	`);
</script>

<span class={classes} {...restProps}>
	<slot />
</span>
