<script>
import axios from 'axios';

	import { onMount } from 'svelte';
  import { API_PREFIX } from '../config';
	import { ApplicationStore, initApplicationStore } from '../stores/applications';
  import { CategoryStore, initCategoryStore } from '../stores/category';

  console.log($ApplicationStore, $CategoryStore);

  $: appByCategory = $CategoryStore.map(category => {
    return {
      ...category,
      applications: $ApplicationStore.filter(app => app.Category && app.Category.name === category.name)
    };
  });

  $: appsNoCategory = $ApplicationStore.filter(app => app.Category == null);

	onMount(() => {
		initApplicationStore();
    initCategoryStore();
	});

  const handleDeleteApp = async (id) => {
    const res = await axios.delete(`${API_PREFIX}/api/v1/applications/${id}`);
    if (res.success) {
      ApplicationStore.update(applications => {
        return applications.filter(app => app.id != res.data);
      });
    }
  }
</script>

<div class="applications-container">
  {#each appByCategory as category (category.id)}
    <div>
      <h3>
        <!-- <img src={category.icon} alt=""> -->
        <span>{category.name}</span>
      </h3>
      <div class="applications-container">
        {#each category.applications as app (app.id)}
          <div class="card" on:click={() => window.open(app.url, "_blank")}>
            {#if app.icon}
              <img class="app-icon" src={`${API_PREFIX}/assets/${app.icon}`} alt={app.name}>
            {/if}
            <div>
              <span class="app-name">{app.name}</span>
              <!-- <span class="app-link">{app.url.slice(8)}</span> -->
              <span class="app-link">{app.Category.name}</span>
            </div>
            <button on:click|stopPropagation={() => handleDeleteApp(app.id)}>X</button>
          </div>
        {/each}
      </div>
    </div>
  {/each}
  <div>
    <h3>
      <span>Other</span>
    </h3>
    <div class="applications-container">
      {#each appsNoCategory as app (app.id)}
        <div class="card" on:click={() => window.open(app.url, "_blank")}>
          {#if app.icon}
            <img class="app-icon" src={`${API_PREFIX}/assets/${app.icon}`} alt={app.name}>
          {/if}
          <div>
            <span class="app-name">{app.name}</span>
          </div>
          <button on:click|stopPropagation={() => handleDeleteApp(app.id)}>X</button>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
.applications-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.card {
	display: flex;
	padding: 0.5em;
	border-radius: 10px;
	cursor: pointer
}

.card:hover {
	background-color: rgba(0, 0, 0, 0.2);
}

.card > div {
	display: flex;
	flex-direction: column;
}

.app-icon {
	width: 2em;
	height: 2em;
	margin-left: 0.5em;
}

.app-name {
	margin: 0;
}

.app-link {
	color: var(--secondary);
	max-width: 100%;
	/* word-break: break-all; */
}

</style>