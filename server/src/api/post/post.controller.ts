import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { AuthUser } from '../user/decorator/user-decorator';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { PostCreateRequestDto } from './dto/post-create-request.dto';
import { PostService } from './post.service';

@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@AuthUser() user: User, @Body() request: PostCreateRequestDto) {
    return this.postService.create(user.id, request);
  }
}
