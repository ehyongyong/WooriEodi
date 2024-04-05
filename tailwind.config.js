/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#36BC9B',
        'brand-dark': '#2e9478',
      }
    },
  },
  plugins: [],
}

