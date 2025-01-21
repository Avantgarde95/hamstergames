import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      keyframes: {},
    },
  },
  plugins: [],
} satisfies Config;
