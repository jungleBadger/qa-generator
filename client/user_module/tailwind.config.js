/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./client/user_module/index.html",
        "./client/user_module/src/**/*.{js,ts,jsx,tsx}",
        "./client/user_module/src/*.{js,ts,jsx,tsx}",
        "./client/user_module/src/components/**/*.{js,ts,jsx,tsx}",
        "./client/user_module/src/pages/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {},
  },
  plugins: [],
};
