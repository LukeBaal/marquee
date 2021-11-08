import { writable } from 'svelte/store';
import axios from 'axios';

export const ApplicationStore = writable([]);

export const initApplicationStore = async () => {
  try {
    const res = await axios.get('http://localhost:5150/api/v1/applications');
    ApplicationStore.set(res.data.data);
  } catch (err) {
    console.error(err);
  }
}