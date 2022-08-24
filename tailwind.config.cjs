/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree'],
      },
      colors: {
        background: '#020202',
      },
    },
  },
  plugins: [],
};
