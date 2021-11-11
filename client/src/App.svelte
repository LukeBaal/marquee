<script>
	import AddApplication from './components/AddApplication.svelte';
import AddCategory from './components/AddCategory.svelte';
	import ApplicationGrid from './components/ApplicationGrid.svelte';
	import { ThemeStore } from './stores/theme';

	let activeTab = "ApplicationGrid";

	$: cssVarStyles = Object.entries($ThemeStore)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');

	window.document.body.style.background = $ThemeStore.background;
	window.document.body.style.color = $ThemeStore.text;

	const setTab = tab => {
		activeTab = tab;
	}
</script>

<main class="main-container" style={cssVarStyles}>
	<div class="tabs">
		<div class="tab" on:click={() => setTab("ApplicationGrid")}>Applications</div>
		<div class="tab" on:click={() => setTab("AddApplication")}>Add Application</div>
		<div class="tab" on:click={() => setTab("AddCategory")}>Add Category</div>
	</div>
	{#if activeTab == "ApplicationGrid"}
		<ApplicationGrid />
	{:else if activeTab == "AddApplication"}
		<AddApplication />
	{:else if activeTab == "AddCategory"}
		<AddCategory />
	{/if}
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

.tabs {
	margin: 1em 0;
}

.tab {
  border-bottom: 2px solid var(--secondary);
  background-color: unset;
  color: var(--text);
  padding: 0.5em;
  border-radius: 3px;
  cursor: pointer;
	display: inline-block;
}

.tab:hover {
  background: rgba(0, 0, 0, 0.2);
	color: var(--seconary);
}
</style>