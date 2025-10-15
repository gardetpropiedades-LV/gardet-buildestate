const baseSans = [
  "Inter",
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  "Segoe UI",
  "Roboto",
  "Helvetica Neue",
  "Arial",
  "Noto Sans",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "Noto Color Emoji",
];

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      animation: {
        "bg-pos-x": "bg-pos-x 3s ease infinite",
      },
      keyframes: {
        "bg-pos-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        brand: {
          50: "#FCF7E8",
          100: "#F8EDCD",
          200: "#F0DA9E",
          300: "#E7C871",
          400: "#DCB24B",
          500: "#C7A046",
          600: "#B38F3F",
          700: "#957532",
          800: "#735926",
          900: "#4F3C19",
          950: "#372812",
          DEFAULT: "#C7A046",
        },
      },
      fontFamily: {
        body: baseSans,
        sans: baseSans,
      },
    },
  },
  plugins: [],
};
