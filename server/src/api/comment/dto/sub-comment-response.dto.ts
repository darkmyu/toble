import UserResponseDto from '../../auth/dto/user-response.dto';
import { Comment } from '../../../entity/comment.entity';

export class SubCommentResponseDto {
  id: number;
  content: string;
  writer: UserResponseDto;
  mentionUser: UserResponseDto | null;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.writer = new UserResponseDto(comment.user);
    this.mentionUser = comment.mentionUser
      ? new UserResponseDto(comment.user)
      : null;
  }
}
