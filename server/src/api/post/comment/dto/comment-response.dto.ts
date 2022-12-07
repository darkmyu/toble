import { Comment } from '../../../../entity/comment.entity';
import { PostUserResponseDto } from './../../dto/post-user-response.dto';

export class CommentResponseDto {
  id: number;
  content: string;
  subCommentsCount: number;
  subComments?: CommentResponseDto[];
  mentionUser: PostUserResponseDto | null;
  writer: PostUserResponseDto;
  createdAt: string;
  updatedAt: string;

  constructor(comment: Comment, subComments?: Comment[]) {
    this.id = comment.id;
    this.content = comment.content;
    this.subCommentsCount = subComments ? subComments.length : 0;
    this.subComments =
      subComments &&
      subComments.map((subComment) => new CommentResponseDto(subComment));
    this.mentionUser =
      comment.mentionUser && new PostUserResponseDto(comment.mentionUser);
    this.writer = new PostUserResponseDto(comment.user);
    this.createdAt = comment.createdAt.toString();
    this.updatedAt = comment.updatedAt.toString();
  }
}
