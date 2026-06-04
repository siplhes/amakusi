/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand green - extracted from logo, this IS the brand
        primary: {
          DEFAULT: "#6DCBB3",
          light: "#8FD9C4",
          deep: "#336F65",
          muted: "#589792",
        },
        // Desert palette - from the Atacama imagery
        desert: {
          sand: "#D4AD7E",
          copper: "#C9804D",
          gold: "#B37E3B",
          rust: "#A04B2C",
        },
        // Backgrounds
        cream: "#F9F9EA",
        sage: "#E6ECDF",
        // Dark tones - from desert shadows
        dark: {
          DEFAULT: "#352921",
          light: "#4F3D33",
        },
        // Secondary
        secondary: {
          DEFAULT: "#9CB1A2",
          light: "#B7C9BB",
        },
      },
      fontFamily: {
        heading: ["Chewy", "cursive"],
        body: ["Work Sans", "sans-serif"],
        display: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
