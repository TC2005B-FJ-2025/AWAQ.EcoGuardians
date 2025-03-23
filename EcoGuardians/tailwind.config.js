/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'verde-claro':'#5F874E',
        'verde-fuerte':'#2A552B',
      }
    }
  },
  plugins: [],
}
