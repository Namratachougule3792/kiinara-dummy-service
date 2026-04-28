/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,vue}",   // ✅ IMPORTANT
    "./components/**/*.{js,ts,vue}",
    "./pages/**/*.{js,ts,vue}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}