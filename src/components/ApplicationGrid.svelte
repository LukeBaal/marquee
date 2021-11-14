<script>
  import { CategoryStore } from '../stores/category';
  import Application from './Application.svelte';
</script>

<div class="applications-container">
  {#each $CategoryStore as category (category.name)}
    <div>
      <h3>
        <i style="color: var(--secondary)" class={category.icon}></i>
        <span>{category.name}</span>
      </h3>
      <div class="applications-container">
        {#each category.items as app (app.name)}
          <Application application={app}/>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
.applications-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

</style>