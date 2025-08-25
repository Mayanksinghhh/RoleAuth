// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      colors: {
        black: "#0a0a0a",
        purple: {
          light: "#a855f7",
          DEFAULT: "#7e22ce",
          dark: "#4c1d95",
        },
      },
      boxShadow: {
        glow: "0 0 15px rgba(168, 85, 247, 0.8)",
      },
      animation: {
        glow: "pulse 2s infinite",
      },
    },
  },
  plugins: [],
};
