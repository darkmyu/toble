export interface User {
  id: number;
  username: string;
  profileImageUrl: string;
}

export interface Blog {
  username: string;
  displayName: string;
  shortWord: string;
  profileImageUrl: string;
  title: string;
  favoritesCount: number;
  followersCount: number;
}
