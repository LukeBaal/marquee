<script>
	import '@fortawesome/fontawesome-free/js/all.js'
	import { onMount } from 'svelte';
	import ApplicationGrid from './components/ApplicationGrid.svelte';
	import LinkGrid from './components/LinkGrid.svelte';
	import { initConfigStore } from './stores/config';
	import { ThemeStore } from './stores/theme';

	$: cssVarStyles = Object.entries($ThemeStore || {})
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');

	$: {
		window.document.body.style.background = $ThemeStore.background;
		window.document.body.style.color = $ThemeStore.text;
	}

	onMount(async () => {
    initConfigStore();
	});
</script>

<main class="main-container" style={cssVarStyles}>
	<ApplicationGrid />
	<LinkGrid />
</main>

<style>
:global(body) {
	font-family: Roboto,sans-serif;
}

.main-container {
	margin: 2em;
	border-top: 2px solid var(--secondary);
}

:global(.container) {
	background: var(--container-background, initial);
	border-radius: 3px;
	padding: 1em;
	backdrop-filter: var(--container-backdrop-filter, initial);
	-webkit-backdrop-filter: var(--container-backdrop-filter, initial);
}
</style>