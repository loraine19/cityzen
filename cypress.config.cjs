const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "wf3obe",

  e2e: {
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 10000,
    requestTimeout: 8000,
    slowTestThreshold: 8000,
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    video: true,
    videosFolder: "cypress/videos",
  },
  experimentalSessionAndOrigin: true,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
