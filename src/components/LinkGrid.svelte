<script>
  import { ConfigStore } from '../stores/config';
  import Generic from './services/Generic.svelte';
</script>

<div style="margin-top: 2em">
  <h3>
    <i class="fas fa-link" style="color: var(--secondary)"></i>
    Links
  </h3>
  <div class="link-container">
    {#if $ConfigStore.links}
      {#each $ConfigStore.links as link (link.name)}
        <Generic app={link}/>
      {/each}
    {/if}
  </div>
</div>

<style>
.link-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>