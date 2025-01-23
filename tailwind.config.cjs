/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Space Grotesk"],
			},
			colors: {
				background: "#090a0a",
				grey: {
					DEFAULT: "#202123",
					100: "#9D9EA1",
					200: "#7D7E81",
					300: "#646569",
					400: "#202123",
					700: "#101217",
					900: "#0B0B0F",
				},
				salmon: {
					DEFAULT: "#E83E27",
					50: "#FC7968",
					100: "#E83E27",
				},
			},
		},
	},
	plugins: [],
};
