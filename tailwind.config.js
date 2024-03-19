import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    // 'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    // 'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [formsPlugin, typographyPlugin],
  theme: {
    fontFamily: {
      body: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        custombgGreen: '#425b34',
        sublistbgGray: '#eee',
      },
    },
    
  },
};
 
 