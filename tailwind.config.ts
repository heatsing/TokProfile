import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        ink: "#10211B",
        pine: "#173D30",
        acid: "#B9FF66",
        sand: "#F5F0E5",
        cream: "#FFFCF5",
        line: "#D8D8CC",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Arial", "sans-serif"],
      },
      boxShadow: {
        lift: "0 18px 60px rgba(16, 33, 27, 0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
