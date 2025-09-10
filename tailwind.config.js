/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0b3d2e',
        cream: '#faf8f3',
        rust: '#D7B48A',
        sage: '#7d8471',
        gold: '#f4c430',
        burgundy: '#800020',
        sand: '#e8dcc6',
      },
    },
  },
  plugins: [],
}