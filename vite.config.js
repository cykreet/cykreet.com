import { sveltekit } from '@sveltejs/kit/vite';
import { Mode, plugin as markdownPlugin } from 'vite-plugin-markdown';

/** @type {import('vite').UserConfig} */
const config = {
  base: '/cykreet.com/',
  plugins: [sveltekit(), markdownPlugin({ mode: [Mode.HTML] })],
};

export default config;
