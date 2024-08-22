/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './_formKit.config.js',
    './node_modules/vue-tailwind-datepicker/**/*.js',
    './formkit.config.js'
  ],
  theme: {
    extend: {
      backgroundImage : {
        'app' : "url('/img/llansola.jpg')"
      },
      colors: {
        "vtd-primary" : colors.blue
      }
    },
  },
  plugins: [],
}

