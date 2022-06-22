module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#FF432A",
        },
      }
    ]
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("daisyui")
  ],
}
