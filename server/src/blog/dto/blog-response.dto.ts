import { User } from '../../user/model/user.entity';
import { Blog } from '../model/blog.entity';

export class BlogResponseDto {
  username: string;
  displayName: string;
  shortWord: string;
  profileImageUrl: string;
  title: string;
  followingCount: number;
  followerCount: number;

  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.shortWord = user.shortWord;
    this.profileImageUrl = user.profileImageUrl;
    this.title = user.blog.title;
    this.followingCount = user.blog.followingCount;
    this.followerCount = user.blog.followerCount;
  }
}
