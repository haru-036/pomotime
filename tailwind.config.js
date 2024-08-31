/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      RedditMono: ["Reddit Mono", "sans-serif"],
    },
    extend: {
      container: {
        center: true,
      },
      colors: {
        white: "#fbfbfb",
        black: "#333",
      },
    },
  },
  plugins: [],
};
