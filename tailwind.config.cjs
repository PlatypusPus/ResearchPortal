/**** Tailwind Config ****/
/** Academic themed palette; adjust as needed **/
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f9f9',
          100: '#e0f2ef',
          200: '#bfe5df',
          300: '#99d3cb',
          400: '#66b8ac',
          500: '#3d9d90',
          600: '#2d7d73',
          700: '#25635c',
          800: '#1f4f4b',
          900: '#153330'
        }
      }
    }
  },
  plugins: []
};
