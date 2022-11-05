/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateAreas: {
        layout: ['login . .', '. . .', '. . .', '. . .', '. . .', '. . .'],
      },
      gridTemplateColumns: {
        layout: 'repeat(3, 1fr)',
      },
      gridTemplateRows: {
        layout: 'repeat(6, 1fr)',
      },
    },
  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')],
};
