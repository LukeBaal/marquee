<script>
  export let app;
  export let onClick = () => window.open(app.url, app.target || "");
</script>

<div class="card" on:click|stopPropagation={onClick}>
  {#if app.logo}
    <div style="margin-right: 0.5em">
      <div class="img-container">
        <img class="link-icon" src={`${app.logo}`} alt={app.logoAlt || app.name}>
      </div>
    </div>
  {:else if app.icon}
    <div class="img-container" style="margin-right: 0.5em">
      <div class="link-icon">
        <i class={`${app.icon}`} style="color: var(--secondary); font-size: 25px"></i>
      </div>
    </div>
  {/if}
  <div class="content">
    <span class="link-name">{app.name}</span>
  </div>
</div>

<style>
.card {
	display: flex;
	padding: 0.75em;
	border-radius: 10px;
	cursor: pointer;
  font-size: small;
}

.card:hover {
	background-color: rgba(0, 0, 0, 0.2);
}

.card.background {
  background-color: rgba(0, 0, 0, 0.2);
  margin: 0.2em;
}

.content {
	display: flex;
	flex-direction: column;
  width: 100%;
}

.img-container {
  width: 16px;
  height: 16px;
	display: flex;
  align-items: center;
}

.link-icon {
  display: block;
	width: 100%;
	height: auto;
}

.link-name {
	margin: 0;
  margin-left: 0.75em;
}

.app-link {
	color: var(--secondary);
	max-width: 100%;
}

.app-link.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

</style>