# Cypress API Test Automation Framework (TypeScript)

A Cypress + TypeScript framework for testing REST APIs using **GET**, **POST**, **PUT**, and **DELETE**.

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

```bash
npm install
```

## Running Tests

- **Open Cypress UI:**  
  `npm run cy:open`  
  Then choose E2E and run the specs under `cypress/e2e/api/`.

- **Run headless:**  
  `npm run cy:run`  
  or  
  `npm run test`

- **Run in Chrome:**  
  `npm run cy:run:chrome`

## Project Structure

```
├── cypress/
│   ├── e2e/
│   │   └── api/
│   │       ├── get-api.cy.ts      # GET tests
│   │       ├── post-api.cy.ts     # POST tests
│   │       ├── put-api.cy.ts      # PUT tests
│   │       ├── delete-api.cy.ts   # DELETE tests
│   │       └── crud-flow.cy.ts    # Full CRUD flow
│   ├── support/
│   │   ├── e2e.ts
│   │   └── commands.ts            # Custom apiGet, apiPost, apiPut, apiDelete
│   └── types/
│       └── api.types.ts           # API response/payload types
├── cypress.config.ts
├── tsconfig.json
└── package.json
```

## Test API

Tests use [JSONPlaceholder](https://jsonplaceholder.typicode.com) (fake REST API):

- **Base URL:** `https://jsonplaceholder.typicode.com`
- **Endpoints:** `/posts`, `/posts/:id`, `/users`, etc.
- **Note:** JSONPlaceholder does not persist data; POST/PUT/DELETE return success but data is not stored.

## Custom Commands

Use in any spec:

- `cy.apiGet(url)` – GET request
- `cy.apiPost(url, body)` – POST request
- `cy.apiPut(url, body)` – PUT request
- `cy.apiDelete(url)` – DELETE request

Example:

```ts
cy.apiPost('/posts', { title: 'Test', body: 'Content', userId: 1 })
  .then((res) => {
    expect(res.status).to.eq(201);
    expect(res.body).to.have.property('id');
  });
```

## Changing the API Base URL

Set in `cypress.config.ts`:

- `baseUrl` or `env.apiBaseUrl` to your API base URL (e.g. `http://localhost:3000/api`).

Then use relative paths in commands: `cy.apiGet('/posts')`, etc.
