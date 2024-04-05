import formsPlugin from '@tailwindcss/forms'
import typographyPlugin from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme: {
    fontFamily: {
      body: ['Dunbar', 'Roboto', 'sans-serif'],
      dunbar: 'Dunbar',
      nunito: 'Nunito Sans',
    },
    extend: {
      colors: {
        primary: '#7A392D',
        'primary-dark': '#231B19',
        second: '#637160',
        yellow: '#e47a0f',
        custombgGreen: '#425b34',
        sublistbgGray: '#eee',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '20px',
          sm: '20px',
          lg: '20px',
          xl: '20px',
          '2xl': '20px',
        },
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '1340px',
          '2xl': '1340px',
        },
      },
    },
  },
}
