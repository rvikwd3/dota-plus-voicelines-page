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
        bronze: {
          from: '#fadd9a',
          to: '#e2b276',
        },
        silver: {
          from: '#dff1f4',
          to: '#add7e0',
        },
        gold: {
          from: '#fdfbd2',
          to: '#e9e463',
        },
        platinum: {
          from: '#dae7ff',
          to: '#5d9eff',
        },
        master: {
          from: '#dbc6ff',
          to: '#8326c5',
        },
        grandmaster: {
          from: '#f3a8a8',
          to: '#e01333',
        },
        bonus: {
          from: '#fcffeb',
          to: '#fafac6',
        },
        bag: {
          from: '#dff1f4',
          to: '#add7e0',
        },
      },
    },
  },
  plugins: [],
}
