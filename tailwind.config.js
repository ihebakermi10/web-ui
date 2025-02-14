module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        'text-primary': 'var(--text-primary)',
      },
      borderRadius: {
        'cl': '12px',
        'cl-full': '24px'
      }
    },
  },
  plugins: [],
}