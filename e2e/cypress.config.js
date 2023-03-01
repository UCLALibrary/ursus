const { defineConfig } = require('cypress')

module.exports = defineConfig({
  SINAI_BASE_URL: 'http://localhost:3004',
  video: false,
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3003',
  },
})
