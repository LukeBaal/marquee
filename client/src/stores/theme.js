import { derived } from 'svelte/store';
import { ConfigStore } from './config';

export const ThemeStore = derived(ConfigStore, $ConfigStore => {
  if ($ConfigStore && $ConfigStore.colors && $ConfigStore.theme && $ConfigStore.colors[$ConfigStore.theme]) {
    return $ConfigStore.colors[$ConfigStore.theme];
  }

  return {
    background: "#0a122a",
    text: "#fbfaf8",
    secondary: "#dd8981"
  }
});
