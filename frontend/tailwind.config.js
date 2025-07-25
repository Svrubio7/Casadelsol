/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-palette-yellow',
    'text-palette-yellow',
    'hover:bg-palette-beige',
    'text-palette-black',
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          light: '#F5F1EA',
          beige: '#D4AF37',
          taupe: '#0C2340',
          black: '#000000',
          yellow: '#FA8C7A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}

