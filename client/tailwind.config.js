/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InclusiveSans', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        headline: 'var(--headline)',
        body: 'var(--body)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        destructive: 'var(--destructive)',
      },
    },
  },
  plugins: [],
};

