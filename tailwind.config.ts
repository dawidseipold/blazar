import type { Config } from "tailwindcss";

const config: Config = {
  daisyui: {
    themes: [
      "light",
      {
        dark: {
          primary: "#a100ff",
          "primary-content": "#ffffff",
          secondary: "#3083E5",
          "secondary-content": "#FFFFFF",
          accent: "#3083E5",
          "accent-content": "#ebd9ff",
          neutral: "#636363",
          "neutral-content": "#ffffff",
          "base-100": "#0e0e0e",
          "base-200": "#141414",
          "base-300": "#1B1B1B",
          "base-content": "#ffffff",
          info: "#53A2FF",
          "info-content": "#141414",
          success: "#39E79E",
          "success-content": "#141414",
          warning: "#FF7B5D",
          "warning-content": "#141414",
          error: "#FF6080",
          "error-content": "#141414",
        },
      },
    ],
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default config;
