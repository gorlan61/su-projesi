/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0f172a',
          navy: '#0c4a6e',
          cyan: '#0e7490',
          light: '#f8fafc',
        },
      },
      backgroundImage: {
        'hero': 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0e7490 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 10px 40px -10px rgba(6,182,212,0.4)',
        'blue-glow': '0 10px 40px -10px rgba(59,130,246,0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
