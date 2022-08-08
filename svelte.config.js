import adapter from "svelte-adapter-bun";
import preprocess from "svelte-preprocess";

export default {
	preprocess: preprocess({
		postcss: true,
	}),
	kit: {
		adapter: adapter(),
	},
};
