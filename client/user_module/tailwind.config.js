/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx}",
    "./src/components/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
