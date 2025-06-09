// tailwind.config.js

import withMT from "@material-tailwind/react/utils/withMT";
// 1. IMPORTER L'OBJET DES COULEURS DE TAILWIND
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
      // 2. AJOUTER CETTE SECTION "COLORS"
      colors: {
        // 3. "DÉVERSER" TOUTES LES COULEURS DE TAILWIND DANS NOTRE THÈME
        ...tailwindColors
      }
    },
  },
  plugins: [],
});