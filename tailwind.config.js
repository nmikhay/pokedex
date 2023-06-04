/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueTheme: "hsl(207, 90%, 54%)",
        yellowTheme: "hsl(54, 100%, 60%)",
        softGreenFontColor: "#86C68C",
        grayTheme: "#F1F1F1",
      },
    },
  },
  plugins: [],
};
