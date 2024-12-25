/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,html}",],
  theme: {
    extend: {
      fontFamily: {
        zen: ["Zen Tokyo Zoo", "cursive"],
        kanit: ["Kanit", "sans-serif"],
        edu: ["Edu AU VIC WA NT Pre", "sans-serif"],
        bowlby: ["Bowlby One", "cursive"],
        sarabun: ["Sarabun", "sans-serif"],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ], 
  daisyui: {
    themes: ["cupcake"],
  }, 
};
