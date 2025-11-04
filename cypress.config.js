const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.w3.org/WAI/", // target site
    setupNodeEvents(on, config) {
      
    },
  },
});
