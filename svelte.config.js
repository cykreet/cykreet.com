import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import sveltePreprocess from 'svelte-preprocess';

/** @type {import("@sveltejs/kit").Config} */
export default {
  extensions: ['.svelte'],
  preprocess: [vitePreprocess()],
  kit: {
    adapter: staticAdapter(),
  },
};
