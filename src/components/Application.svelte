<script>
  import { onMount } from 'svelte';
  export let app;
  let Component;

  onMount(async () => {
    try {
      const type = app.type || "Generic";
      switch (type) {
        case "PiHole":
          Component = (await import('./services/PiHole.svelte')).default;
          break;
        case "OpenWeather":
          Component = (await import('./services/OpenWeather.svelte')).default;
          break;
        default:
          Component = (await import('./services/Generic.svelte')).default;
          break;
      }
    } catch (err) {
      console.log(err);
    }
  });
</script>

<div>
  <svelte:component this={Component} app={app}/>
</div>