<script>
  import { onMount } from 'svelte';
  import Generic from './Generic.svelte';
  import { tempSuffix } from '../../utils';

  export let app;

  let queryResults = [];

  onMount(async () => {
    try {
      if (!app.url || app.subtitle) {
        return;
      }

      queryResults = await app.queries.map(async (query) => {
        const path = (query.path || "data.result.0.value.1").split('.');
        const apiUrl = `${app.endpoint || app.url}/api/v1/query?query=${query.query}`;
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${app.apikey}`
          }
        });
        const data = await res.json();
        let result = data;
        await path.forEach(item => {
          if (!isNaN(parseInt(item))) {
            result = result[parseInt(item)];
          } else {
            result = result[item];
          }
        });

        let value = parseInt(result).toFixed(0)
        let icon;
        switch (query.type) {
          case "temperature":
            if (value <= 25) {
              icon = "fas fa-thermometer-quarter"
            } else if (value <= 50) {
              icon = "fas fa-thermometer-half"
            } else if (value <= 60) {
              icon = "fas fa-thermometer-three-quarters"
            } else {
              icon = "fas fa-temperature-high"
            }
            value = tempSuffix(value, query.unit);
            break;
          case "percent":
            value = `${value}%`
          default:
            icon = query.icon
        }

        return {
          value,
          icon: icon
        };
      });
    } catch (err) {
      console.log(err);
    }

  });

</script>

<Generic app={app}>
  <span slot="content" class={`app-link ${app.display || ""}`}>
    {#each queryResults as queryResult}
      {#await queryResult then result}
        <span>
          <i class={`status-icon ${result.icon}`}></i>
          {result.value}
        </span>
      {/await}
    {/each}
  </span>
</Generic>

<style>
.app-link {
	color: var(--secondary);
	max-width: 100%;
}

.statuc-icon {
  margin-right: 0.2em;
}
</style>