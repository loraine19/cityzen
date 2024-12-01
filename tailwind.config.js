const withMT = require("@material-tailwind/react/utils/withMT");
import { mtConfig } from "@material-tailwind/react";

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa", "sans-serif"],
      },
    },
  },
  plugins: [],
});

const config = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [mtConfig],
};

export default config;
