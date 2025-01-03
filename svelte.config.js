import staticAdapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

/** @type {import("@sveltejs/kit").Config} */
export default {
	extensions: [".svelte", ".svx"],
	preprocess: [mdsvex(), vitePreprocess()],
	kit: {
		adapter: staticAdapter(),
	},
};
