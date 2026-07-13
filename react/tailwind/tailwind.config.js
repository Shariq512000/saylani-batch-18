/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "pre",
  theme: {
    extend: {
      colors: {
        'primary': {
          100: "#d8b4fe",
          200: "#d8b4fe",
          300: "#d8b4fe"
        }
      },
      spacing: {
        1: "2px",
        13: "50px",
        15: "60px"
      }
    },
  },
  plugins: [],
}

