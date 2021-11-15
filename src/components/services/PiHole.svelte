<script>
  import { onMount } from 'svelte';

  export let app;

  let blocked = -1;

  onMount(async () => {
    try {
      if (!app.url || app.subtitle) {
        return;
      }
      const apiUrl = `${app.endpoint || app.url}/api.php`;
      const res = await fetch(apiUrl, {
        credentials: "include"
      });
      const data = await res.json();
      blocked = data.ads_percentage_today.toFixed(1);
    } catch (err) {
      console.log(err);
    }

  });

</script>

<div class="card" on:click={() => window.open(app.url, app.target || "")}>
  {#if app.logo}
    <div style="margin-right: 0.5em">
      <div class="img-container">
        <img class="app-icon" src={`${app.logo}`} alt={app.name}>
      </div>
    </div>
  {:else if app.icon}
    <i class={app.icon}></i>
  {/if}
  <div class="content">
    <span class="app-name">{app.name}</span>
    <!-- <span class="app-link">{url.slice(8)}</span>  -->
    {#if blocked !== -1}
      <span class="app-link">{blocked}% Blocked</span>
    {/if}
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