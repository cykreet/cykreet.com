import * as featherIcons from 'svelte-feather-icons';
import { SvelteComponentTyped } from 'svelte';

declare module 'svelte-feather-icons' {
  class IconClass extends SvelteComponentTyped<{ size?: string; strokeWidth?: number; class?: string }> {}
}
