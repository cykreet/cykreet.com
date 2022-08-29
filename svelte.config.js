import staticAdapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const production = process.env.BUN_ENV === 'production';

/** @type {import("@sveltejs/kit").Config} */
export default {
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [tailwind, autoprefixer],
    },
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
