import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        // Since Fira Code doesn't support Korean, we just put sans-serif font as a fallback...
        mono: ["Fira Code", "Pretendard", "monospace"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
