import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { AuthUser } from '../user/decorator/user-decorator';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { PostCreateRequestDto } from './dto/post-create-request.dto';
import { PostService } from './post.service';
import { PostUpdateRequestDto } from './dto/post-update-request.dto';

@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Query('page') page: number, @Query('size') size: number) {
    return this.postService.findAll(page, size);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@AuthUser() user: User, @Body() request: PostCreateRequestDto) {
    return this.postService.create(user.id, request);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() request: PostUpdateRequestDto,
  ) {
    return this.postService.update(user.id, id, request);
  }
}
