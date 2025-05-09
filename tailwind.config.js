/** @type {import('tailwindcss').Config} */
module.exports = {
  // For Tailwind CSS v2, 'content' was 'purge'
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

