import UserResponseDto from '../../auth/dto/user-response.dto';
import { Comment } from '../../../entity/comment.entity';
import { SubCommentResponseDto } from './sub-comment-response.dto';

export class CommentResponseDto {
  id: number;
  content: string;
  subComments: SubCommentResponseDto[];
  subCommentsCount: number;
  writer: UserResponseDto;

  constructor(comment: Comment, subComments: SubCommentResponseDto[]) {
    this.id = comment.id;
    this.content = comment.content;
    this.subComments = subComments;
    this.subCommentsCount = subComments.length;
    this.writer = new UserResponseDto(comment.user);
  }
}
