/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nepal: {
          red: '#DC143C',
          blue: '#003893',
          gold: '#C8A951',
          dark: '#0A1628',
          navy: '#0D2137',
          slate: '#1E3A5F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
