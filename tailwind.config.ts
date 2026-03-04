import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        petal: "#ffd9e8",
        rose: "#ff89b8",
        cloud: "#d8efff",
        sky: "#9ccaf1",
        grape: "#5b416f",
        cream: "#fff8fc"
      },
      boxShadow: {
        dreamy: "0 18px 35px rgba(129, 68, 106, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
