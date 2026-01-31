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
    cy.apiPost<Post & { id: number }>('/posts', minimalPayload).then((response) => {
      expect(response.status).to.eq(201);
      const body = response.body;
      expect(body).to.have.property('id');
      expect(body.title).to.eq(minimalPayload.title);
    });
  });

  it('POST /posts - should return created resource with id (JSONPlaceholder behavior)', () => {
    const validIds = [...Array(102).keys()]; // 0..101 — JSONPlaceholder returns id 101 for new posts; some fakes return 0
    cy.apiPost<Post & { id: number }>('/posts', newPost).then((response) => {
      const body = response.body;
      expect(body).to.include({
        title: newPost.title,
        body: newPost.body,
        userId: newPost.userId,
      });
      // Coerce to number: API may return id as number or string; oneOf uses strict equality
      expect(Number(body.id)).to.be.oneOf(validIds);
    });
  });
});
