/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan semua file di src/
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#3b6be8", light: "#ebf0fd", dark: "#2d55c5" },
        success: { DEFAULT: "#22883a", light: "#e8f8ed" },
        warning: { DEFAULT: "#c67800", light: "#fff7e0" },
        danger: { DEFAULT: "#d13030", light: "#fdeaea" },
        "blue-light": "#e8f0fd",
        blue: "#1a5fc8",
        border: "#e2e8f0",
        muted: "#64748b",
      },
    },
  },
  plugins: [],
};
