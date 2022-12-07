import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '../../../entity/user.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { AuthUser } from '../../user/decorator/user-decorator';
import { CommentService } from './comment.service';
import { CommentCreateRequestDto } from './dto/comment-create-request.dto';

@Controller('api/v1/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':postId')
  async find(@Param('postId') postId: number) {
    return this.commentService.find(postId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @AuthUser() user: User,
    @Body() request: CommentCreateRequestDto,
  ) {
    await this.commentService.create(user.id, request);
  }
}
