import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CommentService } from './comment.service';
import { AuthUser } from '../user/decorator/user-decorator';
import { User } from '../../entity/user.entity';
import { CommentCreateRequestDto } from './dto/comment-create-request.dto';

@Controller('api/v1/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async find(@Body() body: { postId: number }) {
    return this.commentService.find(body.postId);
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
