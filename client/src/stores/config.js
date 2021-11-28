import { writable } from 'svelte/store';
import { API_PREFIX } from '../config';

export const ConfigStore = writable({});

const getConfig = async () => {
  try {
    const response = await fetch(`${API_PREFIX}/api/config`);
    if (response.redirected) {
      window.location.href = response.url;
      return;
    }
    if (!response.ok) {
      throw Error(`${response.statusText}: ${response.body}`);
    }
    const res = JSON.parse(await response.text());

    if (res.success) {
      return res.data;
    } else {
      console.log(`Error loading config: ${res.reason}`);
    }
  } catch (err) {
    console.log(err);
  }
}

export const initConfigStore = async () => {
  try {
    const config = await getConfig();
    // console.log(config);
    ConfigStore.set(config);
  } catch (err) {
    console.error(err);
  }
}
