/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: '#070B1A',
        tramigo: { blue: '#1A56DB', green: '#059669', gold: '#C9A84C' },
        hub: {
          family: '#E11D48', property: '#D97706', health: '#0891B2',
          legal: '#7C3AED', wealth: '#047857', business: '#1D4ED8',
          celebrations: '#A21CAF',
        },
      },
    },
  },
  plugins: [],
}
