<script>
  export let name;
  export let url;
  export let target;
  export let logo;
  export let icon;
  export let subtitle;
  export let tag;
</script>

<div class="card" on:click={() => window.open(url, target || "")}>
  {#if logo}
    <div style="margin-right: 0.5em">
      <div class="img-container">
        <img class="app-icon" src={`${logo}`} alt={name}>
      </div>
    </div>
  {:else if icon}
    <i class={icon}></i>
  {/if}
  <div class="content">
    <span class="app-name">{name}</span>
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