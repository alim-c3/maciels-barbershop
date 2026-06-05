import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e0c06a",
          dark: "#a8863a",
        },
        barber: {
          black: "#0d0d0d",
          dark: "#1a1a1a",
          charcoal: "#252525",
          gray: "#888888",
        },
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
