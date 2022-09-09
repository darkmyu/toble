import { User } from '../../user/model/user.entity';
import { Blog } from '../model/blog.entity';

export class BlogResponseDto {
  username: string;
  shortWord: string;
  profileImageUrl: string;
  title: string;
  followingCount: number;
  followerCount: number;

  constructor(user: User, blog: Blog) {
    this.username = user.username;
    this.shortWord = user.shortWord;
    this.profileImageUrl = user.profileImageUrl;
    this.title = blog.title;
    this.followingCount = blog.followingCount;
    this.followerCount = blog.followerCount;
  }
}
