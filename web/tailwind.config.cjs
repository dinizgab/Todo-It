/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "background": "#1F002C",
        "task-background": "#67039D",
        "task-background-hover": "#7F13BA"
      }
    },
  },
  plugins: [],
}
