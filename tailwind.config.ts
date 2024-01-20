/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#03A4CA",
        primaryWarning: "#F9D70B",
      },

      fontSize: {
        xs: "10px",
        xss: "13px",
      },
      fontFamily: {
        Almarai: ["var(--font-almarai)"],
        Cairo: ["var(--font-cairo)"],
        IBM: ["var(--font-ibm)"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
