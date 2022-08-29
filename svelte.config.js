import staticAdapter from 'svelte-adapter-bun';
import sveltePreprocess from 'svelte-preprocess';

const production = process.env.BUN_ENV === 'production';

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
    paths: {
      base: production ? '/cykreet.com' : undefined,
    },
    prerender: {
      default: true,
    },
  },
};
