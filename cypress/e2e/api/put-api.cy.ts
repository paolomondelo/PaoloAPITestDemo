import type { Post } from '../../types/api.types';

describe('API - PUT', () => {
  const updatedPost = {
    id: 1,
    title: 'Updated title via PUT',
    body: 'Updated body content via Cypress PUT request.',
    userId: 1,
  };

  it('PUT /posts/1 - should update an existing post and return 200', () => {
    cy.apiPut('/posts/1', updatedPost).then((response) => {
      expect(response.status).to.eq(200);
      const body = response.body as Post;
      expect(body.title).to.eq(updatedPost.title);
      expect(body.body).to.eq(updatedPost.body);
      expect(body.userId).to.eq(updatedPost.userId);
      expect(body.id).to.eq(1);
    });
  });

  it('PUT /posts/1 - should allow partial update (API may merge)', () => {
    const partialUpdate = {
      title: 'Only title updated',
    };
    cy.apiPut('/posts/1', partialUpdate).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('title', partialUpdate.title);
    });
  });

  it('PUT /posts/99 - should update and return 200 for existing id', () => {
    cy.apiPut('/posts/99', {
      id: 99,
      title: 'Post 99 Updated',
      body: 'Body for post 99',
      userId: 10,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(99);
    });
  });
});
