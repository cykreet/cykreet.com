import adapter from 'svelte-adapter-bun';
import preprocess from 'svelte-preprocess';

/** @type {import("@sveltejs/kit").Config} */
export default {
  preprocess: preprocess({
    postcss: true,
  }),
  kit: {
    adapter: adapter({
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
