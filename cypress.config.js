const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    supportFile: 'cypress/support/index.js',	
    specPattern: 'cypress/e2e/**/*.spec.js',
    viewportWidth: 1280,
    viewportHeight: 720
  }
});