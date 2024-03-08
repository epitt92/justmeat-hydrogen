const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      features: {'nesting-rules': false},
    },
  }, theme: {
    extend: {
      fontFamily: {
        'sans': ['"Roboto"', ...defaultTheme.fontFamily.sans],
      },
    }
  }
};

