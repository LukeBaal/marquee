<script>
  import { onMount } from "svelte";
  import Generic from "./Generic.svelte";

  export let app;
  let api = {
    status: '',
    running: 0,
    stopped: 0
  };

  onMount(async () => {
    const token = await fetchToken();
    fetchStatus(token);
  });

  const fetchToken = async () => {
    try {
      const url = `${app.url}/api/auth`;
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: app.username,
          password: app.password,
        })
      });
      const data = await res.json();
      return data.jwt;
    } catch (e) {
      console.log(e);
    }
  }

  const fetchStatus = async (token) => {
    try {
      const url = `${app.url}/api/endpoints?limit=100&start=0`;
      const res = await fetch(url, {
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const endpoints = await res.json();

      if (endpoints.length === 0 || endpoints[0].Snapshots.length === 0) {
        api = {
          status: "disabled"
        }
        return;
      }
      const endpoint = endpoints[0];
      api = {
        status: endpoint.Status === 1 ? "enabled" : "disabled",
        running: endpoint.Snapshots[0].RunningContainerCount,
        stopped: endpoint.Snapshots[0].StoppedContainerCount
      }
    } catch (e) {
      console.log(e);
      api = {
        status: "disabled"
      }
    }
  }
</script>

<Generic app={app}>
  <span slot="content" class="app-link">
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