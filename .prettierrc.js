const shopifyPrettier = require('@shopify/prettier-config')

module.exports = {
  ...shopifyPrettier,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  bracketSpacing: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: ['^react', '^[^.@~].*$', '^@', '^~/.+$', '^\\.[./]', '.*'],
}
