import { writable } from 'svelte/store';
import jsyaml from 'js-yaml';

export const ConfigStore = writable({});

const getConfig = async (path) => {
  try {
    const response = await fetch(path, {
      headers: {
        "pragma": "no-cache",
        "cache-control": "no-store"
      }
    });
    if (response.redirected) {
      window.location.href = response.url;
      return;
    }
    if (!response.ok) {
      throw Error(`${response.statusText}: ${response.body}`);
    }
    const body = await response.text();
    return await jsyaml.load(body);
  } catch (err) {
    console.log(err);
  }
}

export const initConfigStore = async () => {
  try {
    const config = await getConfig('assets/config.yml');
    // console.log(config);
    ConfigStore.set(config);
  } catch (err) {
    console.error(err);
  }
}
