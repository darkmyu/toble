import { Post } from '../../../entity/post.entity';
import { PostUserResponseDto } from './post-user-response.dto';

export class PostsResponseDto {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  views: number;
  likes: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
  user: PostUserResponseDto;

  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.description = post.description;
    this.thumbnail = post.thumbnail;
    this.views = post.postState.views;
    this.likes = post.postState.likes;
    this.commentsCount = post.postState.commentsCount;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.user = new PostUserResponseDto(post.user);
  }
}
