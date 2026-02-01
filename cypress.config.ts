import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      const { tagify } = require('cypress-tags');
      on('file:preprocessor', tagify(config));
      return config;
    },
  },
  env: {
    apiBaseUrl: 'https://jsonplaceholder.typicode.com',
  },
});
