/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        blackOverlay: "rgba(0, 0 ,0 ,0.7)",
        blackLightOverlay: "rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(-200px)",
            transform: "translateX(-200px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0px)",
            transform: "translateX(0px)",
          },
        },

        "slide-fwd": {
          "0%": {
            "-webkit-transform": "translateZ(0px)",
            transform: "translateZ(0px)",
          },
          "100%": {
            "-webkit-transform": "translateZ(160px)",
            transform: "translateZ(160px)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "slide-fwd":
          " slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      height: {
        fitScreen: "calc(100vh - 80px)",
        fitWFooter: "calc(100vh - 146px)",
      },

      minHeight: {
        fitWFooter: "calc(100vh - 146px)",
      },

      backgroundImage: {
        loginBg: "url('../public/assets/bg-login.jpg')",
      },
    },
  },
  plugins: [],
};
