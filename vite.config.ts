import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [{ ...threeMinifier(), enforce: "pre" }, tailwindcss(), sveltekit()],
});
