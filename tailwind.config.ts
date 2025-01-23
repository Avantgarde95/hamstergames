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
      keyframes: {},
    },
  },
  plugins: [],
} satisfies Config;
