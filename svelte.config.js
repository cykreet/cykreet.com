import staticAdapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import("@sveltejs/kit").Config} */
export default {
  preprocess: sveltePreprocess({
    postcss: true,
  }),
  kit: {
    adapter: staticAdapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
    }),
    prerender: {
      default: true,
    },
  },
};
