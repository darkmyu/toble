export interface User {
  id: number;
  username: string;
  profileImageUrl: string;
}

export interface Blog {
  bloggerId: number;
  username: string;
  displayName: string;
  shortWord: string;
  profileImageUrl: string;
  title: string;
  favoritesCount: number;
  followersCount: number;
}

export interface Topic {
  id: number;
  name: string;
}

export interface PostCreateRequest {
  title: string;
  content: string;
  description?: string;
  thumbnail?: string;
}

export interface PostCreateResponse {
  id: number;
}
