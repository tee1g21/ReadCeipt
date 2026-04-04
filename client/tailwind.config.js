/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InclusiveSans_400Regular", "sans-serif"],
        "sans-medium": ["InclusiveSans_500Medium", "sans-serif"],
        "sans-semibold": ["InclusiveSans_600SemiBold", "sans-serif"],
        "sans-bold": ["InclusiveSans_700Bold", "sans-serif"],
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        headline: "rgb(var(--headline) / <alpha-value>)",
        body: "rgb(var(--body) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        success: "rgb(var(--success) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        tertiary: "rgb(var(--tertiary) / <alpha-value>)",
        destructive: "rgb(var(--destructive) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
