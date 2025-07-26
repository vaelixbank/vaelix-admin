/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // analyse tous les fichiers source React TS(X)
  ],
  theme: {
    extend: {
      // Ici tu peux ajouter des extensions personnalisées si besoin
      colors: {
        blueVaelix: '#004080', // exemple couleur personnalisée Vaelix Bank
      },
    },
  },
  plugins: [],
};