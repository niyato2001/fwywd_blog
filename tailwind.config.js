const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'font-black': '#384359',
      'font-green': '#008c8d',
      'bg-green': '#6bc2c3',
      'bg-black': '#262c3a',
      'bg-gray-light': '#f1f6f9',
      'bg-gray-dark': '#979da9',
      'button-green': '#2bb9ba',
      'button-border': '#c5eaea',
      white: colors.white,
      gray: colors.gray,
    },
    screens: {
      laptop: '1440px',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
  important: true,
};
