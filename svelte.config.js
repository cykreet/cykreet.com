import staticAdapter from 'svelte-adapter-bun';
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
      precompress: false,
    }),
    prerender: {
      default: true,
    },
  },
};
