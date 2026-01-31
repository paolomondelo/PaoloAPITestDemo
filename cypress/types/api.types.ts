/**
 * Types for JSONPlaceholder API responses
 */

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostPayload {
  id?: number;
  title?: string;
  body?: string;
  userId?: number;
}
