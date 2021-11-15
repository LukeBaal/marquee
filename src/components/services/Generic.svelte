<script>
  export let app
</script>

<div class="card" on:click={() => window.open(app.url, app.target || "")}>
  {#if app.logo}
    <div style="margin-right: 0.5em">
      <div class="img-container">
        <img class="app-icon" src={`${app.logo}`} alt={app.name}>
      </div>
    </div>
  {:else if app.icon}
    <div class="img-container">
      <div class="app-icon">
        <i class={`${app.icon}`} style="color: var(--secondary); font-size: 25px"></i>
      </div>
    </div>
  {/if}
  <div class="content">
    <span class="app-name">{app.name}</span>
    <!-- <span class="app-link">{url.slice(8)}</span>  -->
    <!-- {#if subtitle}
      <span class="app-link">{subtitle}</span>
    {/if} -->
    <!-- <span class="app-tag">{tag}</span> -->
  </div>
</div>

<style>
.card {
	display: flex;
	padding: 0.5em;
	border-radius: 10px;
	cursor: pointer
}

.card:hover {
	background-color: rgba(0, 0, 0, 0.2);
}

.content {
	display: flex;
	flex-direction: column;
}

.img-container {
  width: 32px;
  height: 32px;
	display: flex;
  align-items: center;
  margin-right: 0.2em;
}

.app-icon {
  display: block;
	width: 100%;
	height: auto;
}

.app-name {
	margin: 0;
}

.app-link {
	color: var(--secondary);
	max-width: 100%;
}
</style>