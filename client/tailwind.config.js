/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ayur: {
          green: '#1A4D2E', // Deep Ayurvedic Green
          olive: '#4F6F52', // Herbal Olive
          beige: '#F5F5DC', // Soft Beige
          brown: '#5D4037', // Earthy Brown
          gold: '#D4AF37', // Light Gold Highlights
        }
      },
      fontFamily: {
        serif: ['"Poppins"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
