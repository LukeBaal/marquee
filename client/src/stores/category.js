import { writable } from 'svelte/store';
import axios from 'axios';
import { API_PREFIX } from '../config';

export const CategoryStore = writable([]);

export const initCategoryStore = async () => {
  try {
    const res = await axios.get(`${API_PREFIX}/api/v1/categories`);
    CategoryStore.set(res.data.data);
  } catch (err) {
    console.error(err);
  }
}