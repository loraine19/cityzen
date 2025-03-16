const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'wf3obe',
  e2e: {
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    video: true,
    videosFolder: 'cypress/videos'

  },
});
