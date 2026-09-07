/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./projets/*.html", "./demos/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        cream: "#F3F9D2",
        "tea-green": "#C9E4A6",
        "willow-green": "#C0D684",
        "midnight-violet": "#3D0B37",
        "blackberry-cream": "#63264A",
        ink: "#1A1A1A",
      },
      fontFamily: {
        heading: ["Poppins", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(61, 11, 55, 0.15)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
