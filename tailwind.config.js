import withMT from "@material-tailwind/react/utils/withMT";
import tailwindColors from 'tailwindcss/colors';

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa", "sans-serif"],
      },
      colors: {
        ...tailwindColors,
      }
    },
  },
  plugins: [],
});