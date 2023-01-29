/** @type {import('tailwindcss').Config} */
/* eslint-disable */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded'],
  },
  theme: {
    fontFamily: {
      alfa: ['Montagu Slab', 'sans-serif'],
      fira: ['Fira Sans', 'sans-serif'],
    },
    extend: {
      keyframes: {
        rising: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        rising: 'rising 0.7s ease-in-out',
      },
      colors: {
        'contribution-000': '#161b22',
        'contribution-100': '#0e4429',
        'contribution-200': '#006d32',
        'contribution-300': '#26a641',
        'contribution-400': '#39d353',
      },
      opacity: {
        10: '.10',
        20: '.20',
        30: '.30',
        40: '.40',
        50: '.50',
        60: '.60',
        70: '.70',
        80: '.80',
        90: '.90',
      },
    },
  },
};
