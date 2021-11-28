<script>
  import { onMount } from "svelte";
  import Generic from "./Generic.svelte";
  import { API_PREFIX } from '../../config';

  export let app;
  let api = {
    status: '',
    running: 0,
    stopped: 0
  };

  onMount(async () => {
    // const token = await fetchToken();
    // fetchStatus(token);
    try {
      const res = await fetch(`${API_PREFIX}/api/portainer`);
      const data = await res.json();
      if (data.success) {
        api = data.data;
      }
    } catch (error) {
      console.log(error);
    }
  });

</script>

<Generic app={app}>
  <span slot="content" class={`app-link ${app.display || ""}`}>
    {#if api.status === 'enabled'}
      <span class="running">
        <i class="fas fa-play"></i>
        {api.running}
      </span>
      <span class="stopped">
        <i class="fas fa-stop"></i>
        {api.stopped}
      </span>
    {/if}
  </span>
</Generic>

<style>
  .running {
    margin-right: 0.2em;
  }
</style>