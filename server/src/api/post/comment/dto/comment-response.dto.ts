import { Comment } from '../../../../entity/comment.entity';
import { PostUserResponseDto } from './../../dto/post-user-response.dto';
import { SubCommentResponseDto } from './sub-comment-response.dto';

export class CommentResponseDto {
  id: number;
  content: string;
  subComments: SubCommentResponseDto[];
  subCommentsCount: number;
  writer: PostUserResponseDto;

  constructor(comment: Comment, subComments: SubCommentResponseDto[]) {
    this.id = comment.id;
    this.content = comment.content;
    this.subComments = subComments;
    this.subCommentsCount = subComments.length;
    this.writer = new PostUserResponseDto(comment.user);
  }
}
