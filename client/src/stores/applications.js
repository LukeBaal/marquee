import { writable } from 'svelte/store';
import axios from 'axios';
import { API_PREFIX } from '../config';

export const ApplicationStore = writable([]);

export const initApplicationStore = async () => {
  try {
    const res = await axios.get(`${API_PREFIX}/applications`);
    ApplicationStore.set(res.data.data);
  } catch (err) {
    console.error(err);
  }
}