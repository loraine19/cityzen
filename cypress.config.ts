import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'wf3obe',
  e2e: {
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    video: true,
    videosFolder: 'cypress/videos',

  },
});
