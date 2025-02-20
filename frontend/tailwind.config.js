/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3f51b5",
        secondary: "#e91e63",
        littleBlack: "#262626",
        littleWhite: "#efefef",
      },
    },
  },
  plugins: [daisyui],
};
