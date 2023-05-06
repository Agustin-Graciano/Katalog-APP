/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
     options: {
       safelist: ['v-button'], 
  },
    theme: {
      colors: {
        'black': '#000000',
        'white': '#FFFFFF'
      },
    }
  }