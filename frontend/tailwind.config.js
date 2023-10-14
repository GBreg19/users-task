/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'Noto-Light': ['Noto-Light', 'sans'],
        'Noto-LightIta': ['Noto-LightIta', 'sans'],
        'Noto-Reg': ['Noto-Reg', 'sans'],
        'Noto-RegIta': ['Noto-RegIta', 'sans'],
        'Noto-Med': ['Noto-Med', 'sans'],
        'Noto-MedIta': ['Noto-MedIta', 'sans'],
        'Noto-SemiB': ['Noto-SemiB', 'sans'],
        'Noto-SemiBIta': ['Noto-SemiBIta', 'sans'],
        'Noto-Bold': ['Noto-Bold', 'sans'],
        'Noto-BoldIta': ['Noto-BoldIta', 'sans'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}