/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backdropGrayscale: {
        40: '.4',
      },
      colors: {
        contribution: {
          0: '#161b22',
          100: '#0e4429',
          200: '#006d32',
          300: '#26a641',
          400: '#39d353',
        },
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
