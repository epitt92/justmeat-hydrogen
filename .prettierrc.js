const shopifyPrettier = require('@shopify/prettier-config')

module.exports = {
  ...shopifyPrettier,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  bracketSpacing: true,
}
