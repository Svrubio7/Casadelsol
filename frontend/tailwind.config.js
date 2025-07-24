/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          light: '#F2F2F2',
          beige: '#DEBD26',
          taupe: '#041E47',
          black: '#000000',
        },
        // You can keep or remove primary/secondary if you want
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

