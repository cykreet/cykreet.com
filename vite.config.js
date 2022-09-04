import { sveltekit } from '@sveltejs/kit/vite';
import markdownPlugin from 'vite-plugin-svelte-md';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    markdownPlugin({
      headEnabled: false,
    }),
    sveltekit(),
  ],
};
