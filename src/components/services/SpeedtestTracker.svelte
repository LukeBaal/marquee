<script>
  import { onMount } from 'svelte';
  import Generic from './Generic.svelte'

  export let app;

  let download;
  let upload;

  onMount(async () => {
    try {
      if (!(app.endpoint || app.url) || app.subtitle) {
        return;
      }
      const apiUrl = `${app.endpoint || app.url}/api/speedtest/latest`;
      const res = await fetch(apiUrl);
      const data = await res.json();
      download = parseInt(data.data.download).toFixed(0);
      upload = parseInt(data.data.upload).toFixed(0);
    } catch (err) {
      console.log(err);
    }

  });
</script>

<Generic app={app}>
  <span slot="content">
    {#if download && upload}
      <div style="display: flex; justify-content: space-evenly">
        <span>
          <i class="fas fa-arrow-down"></i> {download}
        </span>
        <span>
          <i class="fas fa-arrow-up"></i> {upload}
        </span>
      </div>
    {/if}
  </span>
</Generic>