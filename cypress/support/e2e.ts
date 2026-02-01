// Cypress E2E support file
// Import commands and add custom commands here
import './commands';

// Dynamic test filtering based on grepTags
const grepTags = Cypress.env('grepTags');

if (grepTags) {
  beforeEach(function() {
    const testTitle = this.currentTest.fullTitle();
    const shouldSkip = !testTitle.includes(grepTags);
    if (shouldSkip) {
      this.skip();
    }
  });
}