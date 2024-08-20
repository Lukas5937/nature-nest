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
        text: "#5C5C6C",
        orange: "#F39237",
        blue: "#63c7fd",
        darkBlue: "#0E79B2",
        darkGreen: "#304233",
        green: "#2D5834",
        greenHover: "#284D2E",
        lightGreen: "#9AE4CE",
        magenta: "#BF1363",
        magentaHover: "#B0125B",
        dark: "#242432",
        light: "#FBFEF9",
        lightMagenta: "#FCF9FA",
      },
      boxShadow: {
        magentaButton: "0 0 2px 4px #E9CBF3",
        greenButton: "0 0 2px 4px #9AE4CE",
        grayButton: "0 0 0px 3px #9ca3af",
      },
    },
  },
  plugins: [],
}
