<script>
  import axios from 'axios';
  import { API_PREFIX } from '../config';

  let name;
  let url;
  let icon;
  let iconType ="local";
  let Category;
  let active = true;
  let hidden = false;

  const handleSubmit = async () => {
    const app = {
      name,
      url,
      icon,
      iconType,
      Category,
      active,
      hidden
    };
    
    const res = await axios.post(`${API_PREFIX}/api/v1/applications`, app);

  }
</script>

<div>
  <form on:submit|preventDefault={handleSubmit} style="max-width: 20em">
    <div class="input-group">
      <label for="Name">Name</label>
      <input name="Name" type="text" bind:value={name}>
    </div>
    <div class="input-group">
      <label for="URL">URL</label>
      <input name="URL" type="text" bind:value={url}>
    </div>
    <div class="input-group">
      <label for="Icon">Icon</label>
      <input name="Icon" type="text" bind:value={icon}>
    </div>
    <div class="input-group">
      <label for="IconType">Icon Type</label>
      <select name="IconType" bind:value={iconType}>
        <option value="local">Local File</option>
        <option value="font-awesome">Font Awesome</option>
      </select>
    </div>
    <div class="input-group">
      <label for="Category">Category</label>
      <input name="Category" type="text" bind:value={Category}>
    </div>
    <div class="input-group">
      <label for="Active">Active</label>
      <input name="Active" type="checkbox" bind:value={active} checked={active}>
    </div>
    <div class="input-group">
      <label for="Hidden">Hidden</label>
      <input name="Hidden" type="checkbox" bind:value={hidden} checked={hidden}>
    </div>
    <button type="submit">Submit</button>
  </form>
</div>