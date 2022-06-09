const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Radiance', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'bronze': {
          top: '#fadd9a',
          bottom: '#e2b276',
        },
        'silver': {
          top: '#dff1f4',
          bottom: '#add7e0',
        },
        'gold': {
          top: '#fdfbd2',
          bottom: '#e9e463',
        },
        'platinum': {
          top: '#dae7ff',
          bottom: '#5d9eff',
        },
        'master': {
          top: '#dbc6ff',
          bottom: '#8326c5',
        },
        'grandmaster': {
          top: '#f3a8a8',
          bottom: '#e01333',
        },
        'bonus': {
          top: '#fcffeb',
          bottom: '#fafac6',
        },
        'bag': {
          top: '#dff1f4',
          bottom: '#add7e0',
        },
      },
      dropShadow: {
        'white-glow': '0 0 11px rgba(255, 255, 255, 0.8)',
      }
    },
  },
  plugins: [],
}
