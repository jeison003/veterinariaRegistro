/** @type {import('tailwindcss').Config} */
export default {
  // ./src/**/*.{vue,js,ts,jsx,tsx} indica que entrara a la carpeta src y en todas las carpetas revise si hay archivos con las 
  // terminaciones dadas y los escanee buscando archivos tailwind 
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

