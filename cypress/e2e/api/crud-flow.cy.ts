import type { Post } from '../../types/api.types';

/**
 * End-to-end CRUD flow: GET → POST → GET → PUT → GET → DELETE
 */
describe('API - CRUD Flow (GET, POST, PUT, DELETE)', () => {
  let createdId: number;

  it('1. GET - fetch initial list', () => {
    cy.apiGet('/posts').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('2. POST - create a new resource', () => {
    const payload = {
      title: 'CRUD Flow Test Post',
      body: 'Created in Cypress CRUD flow.',
      userId: 1,
    };
    cy.apiPost('/posts', payload).then((response) => {
      expect(response.status).to.eq(201);
      const created = response.body as Post & { id: number };
      createdId = created.id;
      expect(createdId).to.be.a('number');
      expect(created.title).to.eq(payload.title);
    });
  });

  it('3. GET - read the created resource', () => {
    cy.apiGet(`/posts/${createdId}`).then((response) => {
      // JSONPlaceholder does not persist; /posts/101 might not exist. Check status.
      expect([200, 404]).to.include(response.status);
      if (response.status === 200) {
        expect(response.body.id).to.eq(createdId);
      }
    });
  });

  it('4. PUT - update the resource', () => {
    const updated = {
      id: createdId,
      title: 'CRUD Flow - Updated Title',
      body: 'Updated body in CRUD flow.',
      userId: 1,
    };
    cy.apiPut(`/posts/${createdId}`, updated).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq(updated.title);
    });
  });

  it('5. DELETE - remove the resource', () => {
    cy.apiDelete(`/posts/${createdId}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
