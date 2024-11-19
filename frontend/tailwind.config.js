// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'header-gradient': 'linear-gradient(34deg, rgba(41,41,41,1) 0%, rgba(57,57,57,1) 60%, rgba(128,125,125,1) 60%, rgba(255,255,255,1) 100%)',
      },
      colors:{
         footerGray: 'rgba(41,41,41,100)'
      }
    },
  },
  plugins: [],
}
