/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateAreas: {
        layout: [
          'header header header',
          'nav    main   main',
          'nav    footer footer',
        ],
      },
      gridTemplateColumns: {
        layout: 'repeat(3, 1fr)',
      },
      gridTemplateRows: {
        layout: 'repeat(3, 1fr)',
      },
    },
  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')],
};
