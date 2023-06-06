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
        primary: '#e2e8f0', // slate-200
        'primary-dark': '#1e293b', // slate-800
        'primary-text': '#1e293b', // slate-800
        'primary-text-dark': '#e2e8f0', // slate-200
        secondary: '#64748b', // slate-500
        accent: '#38bdf8', // sky-400
      },
    },
    dropShadow: {
      // add drop shadows with weights and accent color of the theme
      'accent-light': '0px 0px 15px rgba(56, 189, 248, 0.3)',
      'accent-bold': '0px 0px 20px rgba(56, 189, 248, 0.7)',
    },
  },
  plugins: [],
};
