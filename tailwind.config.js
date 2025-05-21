/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rich-black': 'rgb(var(--color-rich-black) / <alpha-value>)',
        'dark-gray': 'rgb(var(--color-dark-gray) / <alpha-value>)',
        'lighter-gray': 'rgb(var(--color-lighter-gray) / <alpha-value>)',
        'neon-red': 'rgb(var(--color-neon-red) / <alpha-value>)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 3s ease-in-out infinite',
      },
      boxShadow: {
        'glow': '0 0 15px 5px rgba(255, 23, 68, 0.1)',
        'glow-lg': '0 0 30px 10px rgba(255, 23, 68, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};