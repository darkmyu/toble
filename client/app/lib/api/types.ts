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

export interface BlogCreateRequest {
  username: string;
  title: string;
  blogTopicId: number;
}

export interface BlogCreateResponse {
  username: string;
}

export interface Topic {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  thumbnail: string | null;
  views: number;
  likes: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    displayName: string;
    profileImageUrl: string;
  };
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

export interface PageResponse<T> {
  page: number;
  size: number;
  totalCount: number;
  totalPage: number;
  isLast: boolean;
  items: T[];
}
