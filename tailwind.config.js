/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "secondary-grey": "#light-gray",
        "light-gray": "#F7F7F7",
        "dark-red": "#CC2610",
        "dark-green": "#00A441",
        "light-yellow": "#F1AE11",
        "light-purple": "#5F69C7",
        'light-orange': "#DC5B19"
      }
    }
  },
  plugins: []
};
