/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sedan': ['Sedan SC', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'teko': ['Teko', 'sans-serif'],
        'pro': ['Protest Strike', 'sans-serif'],
        'jet': ['JetBrains Mono', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'rubik': ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}





