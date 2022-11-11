/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{html,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '500px',
      // => @media (min-width: 640px) { ... }

      md: '738px',
      // => @media (min-width: 768px) { ... }

      lg: '998px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1786px'
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: []
};
