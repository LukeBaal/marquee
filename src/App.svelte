<script>
	import '@fortawesome/fontawesome-free/js/all.js'
	import { onMount } from 'svelte';
	import ApplicationGrid from './components/ApplicationGrid.svelte';
	import { initConfigStore } from './stores/config';
	import { ThemeStore } from './stores/theme';

	$: cssVarStyles = Object.entries($ThemeStore || {})
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');

	window.document.body.style.background = $ThemeStore.background;
	window.document.body.style.color = $ThemeStore.text;

	onMount(async () => {
    initConfigStore();
	});
</script>

<main class="main-container" style={cssVarStyles}>
	<ApplicationGrid />
</main>

<style>
:global(body) {
	font-family: Roboto,sans-serif;
}

.main-container {
	margin: 2em;
	border-top: 2px solid var(--secondary);
}
</style>