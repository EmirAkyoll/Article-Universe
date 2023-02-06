/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
    screens: {
      //* THIS RESPONSIVE SYSTEM IS DESIGNED AS -MOBILE FIRST-
      //* DEFAULT DEVICE IS PHONE => (max-width: 649px)

      'onTablet': '650px',
      // => @media (min-width: 500px && max-width: 999px) { ... }

      'onLaptop': '1000px',
      // => @media (min-width: 1000px && max-width: 1249px) { ... }

      'onDesktop': '1280px',
      // => @media (min-width: 1250px) { ... }
    },

    extend: {
      // colors: {
      //   'folder-color': '#EEF283',
      // },

      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
       },
    },
  },

  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          sizeXY: (value) => ({
            width: value,
            height: value
          }),
        },
        { values: theme('width', 'height') }
      )
    })
  ],
}