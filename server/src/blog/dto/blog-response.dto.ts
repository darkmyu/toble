import { User } from '../../user/model/user.entity';

export class BlogResponseDto {
  username: string;
  displayName: string;
  shortWord: string;
  profileImageUrl: string;
  title: string;

  constructor(
    user: User,
    private favoritesCount: number,
    private followersCount: number,
  ) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.shortWord = user.shortWord;
    this.profileImageUrl = user.profileImageUrl;
    this.title = user.blog.title;
  }
}
