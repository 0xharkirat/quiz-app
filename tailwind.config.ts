import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#15468F", // Primary color
          dark: "#15468F",    // Seed color
          container: "#D8E2FF",
          onContainer: "#001A41",
        },
        inversePrimary: "#84ABFA", // Added InversePrimary
        secondary: {
          DEFAULT: "#575E71",
          container: "#DBE2F9",
          onContainer: "#141B2C",
        },
        tertiary: {
          DEFAULT: "#715573",           // Main Tertiary Color
          container: "#C1A1C2",         // Tertiary Container
          onContainer: "#29132D",       // Text on Tertiary Container
          onTertiary: "#FFFFFF",        // Text on Tertiary
        },
        background: "#F9F9FF",
        onBackground: "#1A1B20",
        outline: "#75777F",
       
      },
    },
  },
  plugins: [],
} satisfies Config;
