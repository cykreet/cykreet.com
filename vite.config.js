import { sveltekit } from '@sveltejs/kit/vite';
import { Mode, plugin as markdownPlugin } from 'vite-plugin-markdown';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [markdownPlugin({ mode: Mode.HTML }), sveltekit()],
};

export default config;
