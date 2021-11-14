<script>
  import { onMount } from 'svelte';
  export let application;
  let Component;

  onMount(async () => {
    try {
      const type = application.type || "Generic";
      switch (type) {
        case "PiHole":
          Component = (await import('./services/PiHole.svelte')).default;
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
  <svelte:component this={Component} {...application}/>
</div>