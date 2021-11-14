<script>
  import axios from 'axios';
  import { API_PREFIX } from '../config';
import { CategoryStore } from '../stores/category';

  let name;
  let icon;
  let iconType ="local";

  const handleSubmit = async () => {
    const category = {
      name,
      icon,
      iconType
    };
    console.log(category);
    
    const res = await axios.post(`${API_PREFIX}/api/v1/categories`, category);
    if (res.success) {
      CategoryStore.update((categories) => {
        return [
          ...categories,
          res.data
        ]
      });
    }
  }
</script>

<div>
  <form on:submit|preventDefault={handleSubmit} style="max-width: 20em">
    <div class="input-group">
      <label for="Name">Name</label>
      <input name="Name" type="text" bind:value={name}>
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
    <button type="submit">Submit</button>
  </form>
</div>