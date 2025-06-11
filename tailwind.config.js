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
        midnight: '#0a0a0a',
        cream: '#faf8f3',
        rust: '#d4622a',
        sage: '#7d8471',
        gold: '#f4c430',
        burgundy: '#800020',
        sand: '#e8dcc6',
      },
    },
  },
  plugins: [],
}