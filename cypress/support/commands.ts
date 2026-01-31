/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to perform GET request
       */
      apiGet<T = unknown>(url: string, options?: Partial<Cypress.RequestOptions>): Chainable<Cypress.Response<T>>;
      /**
       * Custom command to perform POST request
       */
      apiPost<T = unknown>(url: string, body?: object, options?: Partial<Cypress.RequestOptions>): Chainable<Cypress.Response<T>>;
      /**
       * Custom command to perform PUT request
       */
      apiPut<T = unknown>(url: string, body?: object, options?: Partial<Cypress.RequestOptions>): Chainable<Cypress.Response<T>>;
      /**
       * Custom command to perform DELETE request
       */
      apiDelete<T = unknown>(url: string, options?: Partial<Cypress.RequestOptions>): Chainable<Cypress.Response<T>>;
    }
  }
}

const getBaseUrl = () => Cypress.env('apiBaseUrl') || Cypress.config('baseUrl') || 'https://jsonplaceholder.typicode.com';

Cypress.Commands.add('apiGet', (url: string, options = {}) => {
  const baseUrl = getBaseUrl();
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  return cy.request({
    method: 'GET',
    url: fullUrl,
    failOnStatusCode: false,
    ...options,
  });
});

Cypress.Commands.add('apiPost', (url: string, body = {}, options = {}) => {
  const baseUrl = getBaseUrl();
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  return cy.request({
    method: 'POST',
    url: fullUrl,
    body,
    failOnStatusCode: false,
    ...options,
  });
});

Cypress.Commands.add('apiPut', (url: string, body = {}, options = {}) => {
  const baseUrl = getBaseUrl();
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  return cy.request({
    method: 'PUT',
    url: fullUrl,
    body,
    failOnStatusCode: false,
    ...options,
  });
});

Cypress.Commands.add('apiDelete', (url: string, options = {}) => {
  const baseUrl = getBaseUrl();
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  return cy.request({
    method: 'DELETE',
    url: fullUrl,
    failOnStatusCode: false,
    ...options,
  });
});

export {};
