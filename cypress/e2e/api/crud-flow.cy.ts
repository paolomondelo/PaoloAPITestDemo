import type { Post } from '../../types/api.types';

/**
 * End-to-end CRUD flow: GET → POST → GET → PUT → GET → DELETE
 * Note: JSONPlaceholder does not persist data. POST returns id 101, but that
 * resource does not exist (only posts 1-100). We use post id 1 for PUT/DELETE
 * since those require an existing resource.
 */

describe('API - CRUD Flow', () => {
  beforeEach(() => {
    cy.log('Starting API GET test');
  });

  afterEach(() => {
    cy.log('API CRUD Flow test completed');
  });

describe('API - CRUD Flow (GET, POST, PUT, DELETE)', () => {
  const existingPostId = 1;

  it('@critical @smoke 1. GET - fetch initial list', () => {
    cy.apiGet('/posts').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('@critical @smoke 2. POST - create a new resource', () => {
    const payload = {
      title: 'CRUD Flow Test Post',
      body: 'Created in Cypress CRUD flow.',
      userId: 1,
    };
    cy.apiPost('/posts', payload).then((response) => {
      expect(response.status).to.eq(201);
      const created = response.body as Post & { id: number };
      expect(created.id).to.be.a('number');
      expect(created.title).to.eq(payload.title);
    });
  });

  it('@critical @smoke 3. GET - read an existing resource', () => {
    cy.apiGet<Post>(`/posts/${existingPostId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(existingPostId);
    });
  });

  it('@critical @smoke 4. PUT - update the resource', () => {
    const updated = {
      id: existingPostId,
      title: 'CRUD Flow - Updated Title',
      body: 'Updated body in CRUD flow.',
      userId: 1,
    };
    cy.apiPut<Post>(`/posts/${existingPostId}`, updated).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq(updated.title);
    });
  });

  it('@critical @smoke 5. DELETE - remove the resource', () => {
    cy.apiDelete(`/posts/${existingPostId}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
});
//npx cypress open --env grepTags=@smoke
