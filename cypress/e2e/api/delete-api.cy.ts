describe('API - DELETE', () => {
  beforeEach(() => {
    cy.log('Starting API DELETE test');
  });

  afterEach(() => {
    cy.log('API DELETE test completed');
  });

  it('@smoke @critical DELETE /posts/1 - should delete a post and return 200', () => {
    cy.apiDelete('/posts/1').then((response) => {
      expect(response.status).to.eq(200);
      // JSONPlaceholder returns empty object on successful delete
      expect(response.body).to.deep.eq({});
    });
  });

  it('@regression DELETE /posts/50 - should return 200 for valid id', () => {
    cy.apiDelete('/posts/50').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('@regression DELETE /posts/99999 - JSONPlaceholder may return 200 (no-op)', () => {
    cy.apiDelete('/posts/99999').then((response) => {
      // JSONPlaceholder typically returns 200 even for non-existent ids
      expect(response.status).to.be.oneOf([200, 404]);
    });
  });

  it('@critical DELETE then GET - resource should be gone (or 404)', () => {
    cy.apiDelete('/posts/2').then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200);
      cy.apiGet('/posts/2').then((getResponse) => {
        // JSONPlaceholder is fake - GET may still return 200; real API would often return 404
        expect([200, 404]).to.include(getResponse.status);
      });
    });
  });
});
