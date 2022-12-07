import { CommentResponseDto } from '../comment/dto/comment-response.dto';
import { PostResponseDto } from './post-response.dto';

export class PostAndCommentResponseDto {
  constructor(
    private post: PostResponseDto,
    private comments: CommentResponseDto[],
  ) {}
}
