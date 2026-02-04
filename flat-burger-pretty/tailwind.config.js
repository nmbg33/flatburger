/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./app/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F5F0",
        orange: "#FF4400",
        yellow: "#FEEBCB",
        ink: "#141311",
        border: "#141311",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
