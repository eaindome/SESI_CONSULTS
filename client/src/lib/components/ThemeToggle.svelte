<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let darkMode = $state(false);

	// Initialize theme from localStorage or system preference
	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		darkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
		updateTheme();

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) {
				darkMode = e.matches;
				updateTheme();
			}
		};
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	});

	function updateTheme() {
		if (darkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	function toggleTheme() {
		darkMode = !darkMode;
		updateTheme();
	}
</script>

<button
	type="button"
	onclick={toggleTheme}
	aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
	class="relative inline-flex items-center justify-center rounded-xl p-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
>
	{#if darkMode}
		<Sun class="h-5 w-5" aria-hidden="true" />
	{:else}
		<Moon class="h-5 w-5" aria-hidden="true" />
	{/if}
</button>
