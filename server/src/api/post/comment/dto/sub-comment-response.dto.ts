import { Comment } from '../../../../entity/comment.entity';
import { PostUserResponseDto } from '../../dto/post-user-response.dto';

export class SubCommentResponseDto {
  id: number;
  content: string;
  writer: PostUserResponseDto;
  mentionUser: PostUserResponseDto | null;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.writer = new PostUserResponseDto(comment.user);
    this.mentionUser = comment.mentionUser
      ? new PostUserResponseDto(comment.user)
      : null;
  }
}
