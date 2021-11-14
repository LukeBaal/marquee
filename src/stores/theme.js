import { derived } from 'svelte/store';
import { ConfigStore } from './config';

export const ThemeStore = derived(ConfigStore, $ConfigStore => {
  return $ConfigStore.colors || {
    background: "#0a122a",
    primary: "#698f3f",
    text: "#fbfaf8",
    'background-light': "#e7decd",
    secondary: "#dd8981"
  }
});
