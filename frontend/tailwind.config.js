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
        dark: "#242432",
        light: "#FBFEF9",
        bgMagenta: "#FCF9FA",
        darkGreen: "#304233",
        green: "#3F6E55",
        greenHover: "#2C5A44",
        greenCard: "#D9EAD3",
        grayCard: "#E3E8E0",
        magenta: "#BF1363",
        magentaHover: "#B0125B",
        highlightBlue: "#63c7fd",
      },
      boxShadow: {
        magentaButton: "0 0 2px 4px #D14F78",
        greenButton: "0 0 2px 4px #9AE4CE",
        grayButton: "0 0 0px 3px #9ca3af",
      },
      screens: {
        xs: "440px",
      },
    },
  },
  plugins: [],
}
