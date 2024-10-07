import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        satoshi: ['var(--font-satoshi)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
