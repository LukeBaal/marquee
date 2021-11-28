<script>
  import { onMount } from 'svelte';
  import Generic from './Generic.svelte'

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

<Generic app={app}>
  <span slot="content" class="app-link">{blocked}% Blocked</span>
</Generic>

<style>
.app-link {
	color: var(--secondary);
	max-width: 100%;
}
</style>