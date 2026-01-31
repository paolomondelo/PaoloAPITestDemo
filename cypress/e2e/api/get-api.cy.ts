import type { Post } from '../../types/api.types';

describe('API - GET', () => {
  it('GET /posts - should return all posts with status 200', () => {
    cy.apiGet('/posts').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(100);
      expect(response.body[0]).to.have.keys('userId', 'id', 'title', 'body');
    });
  });

  it('GET /posts/1 - should return a single post by id', () => {
    cy.apiGet('/posts/1').then((response) => {
      expect(response.status).to.eq(200);
      const post = response.body as Post;
      expect(post.id).to.eq(1);
      expect(post.userId).to.be.a('number');
      expect(post.title).to.be.a('string');
      expect(post.body).to.be.a('string');
    });
  });

  it('GET /posts?userId=1 - should filter posts by userId', () => {
    cy.apiGet('/posts?userId=1').then((response) => {
      expect(response.status).to.eq(200);
      const posts = response.body as Post[];
      expect(posts).to.be.an('array');
      posts.forEach((post) => {
        expect(post.userId).to.eq(1);
      });
    });
  });

  it('GET /posts/99999 - should return 404 for non-existent resource', () => {
    cy.apiGet('/posts/99999').then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('GET /users - should return users list', () => {
    cy.apiGet('/users').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.keys('id', 'name', 'username', 'email');
    });
  });
});
