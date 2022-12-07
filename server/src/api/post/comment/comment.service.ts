import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../../entity/comment.entity';
import { CommentCreateRequestDto } from './dto/comment-create-request.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { SubCommentResponseDto } from './dto/sub-comment-response.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(userId: number, request: CommentCreateRequestDto) {
    const parentComment = await this.commentRepository.findOneBy({
      id: request.parentId,
    });

    const rootParentCommentId = parentComment?.parentId ?? null;
    const currentParentCommentId = rootParentCommentId ?? request.parentId;
    const isMention = !!rootParentCommentId;

    const savedComment = await this.commentRepository.save({
      userId,
      postId: request.postId,
      parentId: currentParentCommentId,
      mentionUserId: isMention ? parentComment.userId : null,
      content: request.content,
    });
  }

  async find(postId: number) {
    const comments = await this.commentRepository.find({
      relations: { user: true, mentionUser: true },
      where: { postId },
    });

    if (!comments) return [];

    const subCommentMap = new Map<number, SubCommentResponseDto[]>();
    comments.forEach((comment) => {
      if (!comment.parentId) return;

      const newArray = subCommentMap.get(comment.parentId) ?? [];
      newArray.push(new SubCommentResponseDto(comment));
      subCommentMap.set(comment.parentId, newArray);
    });

    return comments
      .filter((comment) => comment.parentId === null)
      .map(
        (comment) =>
          new CommentResponseDto(comment, subCommentMap.get(comment.id) ?? []),
      );
  }
}
