const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        brand: {
          DEFAULT: '#6600CC',
          50: '#D9B3FF',
          100: '#CC99FF',
          200: '#B266FF',
          300: '#9933FF',
          400: '#7F00FF',
          500: '#6600CC',
          600: '#4C0099',
          700: '#330066',
          800: '#190033',
          900: '#0D001A',
        },
        secondary: colors.red,
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont'],
    },
    transitionDuration: {
      DEFAULT: '300ms',
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
