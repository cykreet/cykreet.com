import { sveltekit } from '@sveltejs/kit/vite';
import markdownPlugin from 'vite-plugin-svelte-md';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    markdownPlugin({
      headEnabled: false,
    }),
    sveltekit(),
  ],
  resolve: {
    alias: {
      $markdown: resolve('./src/markdown/'),
    },
  },
};
