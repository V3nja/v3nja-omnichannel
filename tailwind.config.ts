import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080a",
        foreground: "#f4f4f6",
        card: "#0f0f13",
        "card-hover": "#15151c",
        border: "rgba(255, 255, 255, 0.08)",
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(245, 158, 11, 0.4)",
        "cyan-glow": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "emerald-glow": "0 0 25px -5px rgba(16, 185, 129, 0.4)",
        "rose-glow": "0 0 25px -5px rgba(244, 63, 94, 0.4)",
        "purple-glow": "0 0 25px -5px rgba(168, 85, 247, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
