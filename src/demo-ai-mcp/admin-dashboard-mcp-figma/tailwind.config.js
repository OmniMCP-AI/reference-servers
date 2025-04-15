/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        primary: "#4880FF",
        secondary: "#202224",
        "primary-text": "#202224",
        "secondary-text": "#565656",
        "light-bg": "#F5F6FA",
        "border-color": "#D5D5D5",
        "divider-color": "#E0E0E0",
        "delete-red": "#FD5454",
        "badge-red": "#F93C65",
        success: "#00B69B",
        warning: "#FCBE2D",
        danger: "#FD5454",
        "chart-blue": "#4379EE",
        "icon-orange": "#FF9066",
        "icon-purple": "#8280FF",
        "icon-green": "#4AD991",
        "icon-yellow": "#FEC53D",
      },
      spacing: {
        sidebar: "260px",
        header: "70px",
      },
      margin: {
        sidebar: "260px",
      },
      inset: {
        sidebar: "260px",
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "19px",
      },
      boxShadow: {
        card: "6px 6px 54px rgba(0, 0, 0, 0.05)",
      },
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [],
};
