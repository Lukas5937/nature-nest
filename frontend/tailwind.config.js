/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
        serif: ["Goblin One", "ui-serif", "serif"],
      },
      colors: {
        orange: "#F39237",
        blue: "#63c7fd",
        darkBlue: "#0E79B2",
        green: "#304233",
        lightGreen: "#9AE4CE",
        magenta: "#BF1363",
        dark: "#242432",
        light: "#FBFEF9",
        lightMagenta: "#FCF9FA",
      },
    },
  },
  plugins: [],
};
