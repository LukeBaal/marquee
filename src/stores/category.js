import { derived } from 'svelte/store';
import { ConfigStore } from './config';

export const CategoryStore = derived(ConfigStore, $ConfigStore => $ConfigStore.services || []);
