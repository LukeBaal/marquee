<script>
  export let app;
  export let onClick;
</script>

<div class="card" on:click={onClick || window.open(app.url, app.target || "")}>
  {#if app.logo}
    <div style="margin-right: 0.5em">
      <div class="img-container">
        <slot name="logo">
          <img class="app-icon" src={`${app.logo}`} alt={app.logoAlt || app.name}>
        </slot>
      </div>
    </div>
  {:else if app.icon}
    <div class="img-container" style="margin-right: 0.5em">
      <div class="app-icon">
        <slot name="icon">
          <i class={`${app.icon}`} style="color: var(--secondary); font-size: 25px"></i>
        </slot>
      </div>
    </div>
  {/if}
  <div class="content">
    <span class="app-name">{app.name}</span>
    <slot name="content"></slot>
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

:global(.card.background) {
  background-color: rgba(0, 0, 0, 0.2);
  margin: 0.2em;
}

.content {
	display: flex;
	flex-direction: column;
  width: 100%;
}

.img-container {
  width: 32px;
  height: 32px;
	display: flex;
  align-items: center;
}

:global(.app-icon) {
  display: block;
	width: 100%;
	height: auto;
}

.app-name {
	margin: 0;
}

:global(.app-link) {
	color: var(--secondary);
	max-width: 100%;
}

:global(.app-link.grid) {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

</style>