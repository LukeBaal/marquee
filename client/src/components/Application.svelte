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
        case "SpeedtestTracker":
          Component = (await import('./services/SpeedtestTracker.svelte')).default;
          break;
        case "Portainer":
          Component = (await import('./services/Portainer.svelte')).default;
          break;
        case "Prometheus":
          Component = (await import('./services/Prometheus.svelte')).default;
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