<script>
	import ApplicationGrid from './components/ApplicationGrid.svelte';
  import { ThemeStore } from './stores/theme';

	$: cssVarStyles = Object.entries($ThemeStore)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');

	window.document.body.style.background = $ThemeStore.background;
	window.document.body.style.color = $ThemeStore.text;
</script>

<main class="main-container" style={cssVarStyles}>
	<h1>Good Morning!</h1>
	<ApplicationGrid />
</main>

<style>
:global(body) {
	font-family: Roboto,sans-serif;
}

.main-container {
	margin: 2em;
	margin-top: 5em;
	border-top: 2px solid var(--secondary);
}
</style>