import type { Post, CreatePostPayload } from '../../types/api.types';

describe('API - POST', () => {
  const newPost: CreatePostPayload = {
    title: 'Cypress API Test Post',
    body: 'This is a test post created by Cypress automation.',
    userId: 1,
  };

  it('POST /posts - should create a new post and return 201', () => {
    cy.apiPost('/posts', newPost).then((response) => {
      expect(response.status).to.eq(201);
      const created = response.body as Post & { id?: number };
      expect(created.title).to.eq(newPost.title);
      expect(created.body).to.eq(newPost.body);
      expect(created.userId).to.eq(newPost.userId);
      expect(created.id).to.be.a('number');
    });
  });

  it('POST /posts - should accept minimal valid payload', () => {
    const minimalPayload = {
      title: 'Minimal',
      body: 'Body',
      userId: 1,
    };
    cy.apiPost('/posts', minimalPayload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq(minimalPayload.title);
    });
  });

  it('POST /posts - should return created resource with id (JSONPlaceholder behavior)', () => {
    cy.apiPost('/posts', newPost).then((response) => {
      expect(response.body).to.include({
        title: newPost.title,
        body: newPost.body,
        userId: newPost.userId,
      });
      expect(response.body.id).to.be.oneOf([...Array(101).keys()].slice(1)); // JSONPlaceholder returns id 101 for new posts
    });
  });
});
