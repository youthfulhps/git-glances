/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backdropGrayscale: {
        40: '.4',
      },
      colors: {
        contributions: {
          0: '#161b22',
          100: '#0e4429',
          200: '#006d32',
          300: '#26a641',
          400: '#39d353',
        },
      },
      backgroundImage: {
        'contribution-000':
          'linear-gradient(\n' +
          '  135deg,\n' +
          '  hsl(215deg 21% 11%) 0%,\n' +
          '  hsl(217deg 18% 13%) 28%,\n' +
          '  hsl(219deg 15% 14%) 44%,\n' +
          '  hsl(222deg 13% 16%) 53%,\n' +
          '  hsl(224deg 11% 18%) 60%,\n' +
          '  hsl(227deg 10% 19%) 65%,\n' +
          '  hsl(229deg 8% 21%) 72%,\n' +
          '  hsl(233deg 7% 23%) 80%,\n' +
          '  hsl(236deg 6% 24%) 89%,\n' +
          '  hsl(240deg 5% 26%) 100%\n' +
          ')',
        'contribution-100':
          'linear-gradient(\n' +
          '  135deg,\n' +
          '  hsl(150deg 66% 16%) 0%,\n' +
          '  hsl(166deg 100% 13%) 28%,\n' +
          '  hsl(175deg 100% 13%) 44%,\n' +
          '  hsl(182deg 100% 14%) 53%,\n' +
          '  hsl(188deg 73% 17%) 60%,\n' +
          '  hsl(195deg 47% 21%) 65%,\n' +
          '  hsl(202deg 31% 24%) 72%,\n' +
          '  hsl(210deg 20% 25%) 80%,\n' +
          '  hsl(222deg 11% 26%) 89%,\n' +
          '  hsl(240deg 5% 26%) 100%\n' +
          ')',
        'contribution-200':
          'linear-gradient(\n' +
          '  135deg,\n' +
          '  hsl(148deg 100% 21%) 0%,\n' +
          '  hsl(160deg 100% 21%) 28%,\n' +
          '  hsl(171deg 100% 20%) 44%,\n' +
          '  hsl(180deg 100% 19%) 53%,\n' +
          '  hsl(187deg 100% 20%) 60%,\n' +
          '  hsl(191deg 100% 20%) 65%,\n' +
          '  hsl(199deg 52% 26%) 72%,\n' +
          '  hsl(208deg 29% 28%) 80%,\n' +
          '  hsl(221deg 15% 28%) 89%,\n' +
          '  hsl(240deg 5% 26%) 100%\n' +
          ')',
        'contribution-300':
          'linear-gradient(\n' +
          '  135deg,\n' +
          '  hsl(133deg 63% 40%) 0%,\n' +
          '  hsl(156deg 100% 31%) 28%,\n' +
          '  hsl(168deg 100% 29%) 44%,\n' +
          '  hsl(178deg 100% 27%) 53%,\n' +
          '  hsl(187deg 100% 27%) 60%,\n' +
          '  hsl(191deg 100% 27%) 65%,\n' +
          '  hsl(195deg 88% 26%) 72%,\n' +
          '  hsl(207deg 36% 32%) 80%,\n' +
          '  hsl(219deg 18% 30%) 89%,\n' +
          '  hsl(240deg 5% 26%) 100%\n' +
          ')',
        'contribution-400':
          'linear-gradient(\n' +
          '  135deg,\n' +
          '  hsl(130deg 64% 53%) 0%,\n' +
          '  hsl(156deg 100% 39%) 28%,\n' +
          '  hsl(167deg 100% 36%) 44%,\n' +
          '  hsl(178deg 100% 32%) 53%,\n' +
          '  hsl(187deg 100% 32%) 60%,\n' +
          '  hsl(192deg 100% 31%) 65%,\n' +
          '  hsl(194deg 100% 28%) 72%,\n' +
          '  hsl(206deg 40% 34%) 80%,\n' +
          '  hsl(219deg 19% 32%) 89%,\n' +
          '  hsl(240deg 5% 26%) 100%\n' +
          ')',
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
