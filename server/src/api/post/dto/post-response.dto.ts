import { Post } from '../../../entity/post.entity';
import { PostUserResponseDto } from './post-user-response.dto';

export class PostResponseDto {
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
  writer: PostUserResponseDto;

  constructor(post: Partial<Post>) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.description = post.description;
    this.thumbnail = post.thumbnail;
    this.views = post.postState.views;
    this.likes = post.postState.likes;
    this.commentsCount = post.postState.commentsCount;
    this.createdAt = post.createdAt.toString();
    this.updatedAt = post.updatedAt.toString();
    this.writer = new PostUserResponseDto(post.user);
  }
}
