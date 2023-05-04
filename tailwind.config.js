/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'primary' : '#e2e8f0', // slate-200
        'primary-dark': '#1e293b', // slate-800
        'primary-text' : '#1e293b', // slate-200
        'primary-text-dark' : '#e2e8f0', // slate-800
        'secondary': '#64748b', // slate-500
        'accent' : '#38bdf8' // sky-400
      }
    },
  },
  plugins: [],
}
