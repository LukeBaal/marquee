<script>
	import { onMount } from 'svelte';
import { append } from 'svelte/internal';
	import { ApplicationStore, initApplicationStore } from './stores/applications';
	import { ThemeStore } from './stores/theme';

	$: cssVarStyles = Object.entries($ThemeStore)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');

	window.document.body.style.background = $ThemeStore.background;
	window.document.body.style.color = $ThemeStore.text;

	onMount(() => {
		initApplicationStore();
	});
</script>

<main style={cssVarStyles}>
	<h1>Hello</h1>
	<div class="applications-container">
		{#each $ApplicationStore as app (app.id)}
			<div class="container">
				<h3>{app.name}</h3>
				<a href={app.url} style="text-decoration: none; color: var(--text)" target="_blank">{app.url}</a>
			</div>
		{/each}
	</div>
</main>

<style>
.applications-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: masonry;
}
.container {
	background: var(--secondary);
	margin: 1em;
	padding: 1em;
	border-radius: 10px;
}
</style>