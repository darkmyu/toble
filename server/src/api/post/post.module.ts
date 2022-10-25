import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostState } from '../../entity/post-state.entity';
import { Post } from '../../entity/post.entity';
import { Blog } from './../../entity/blog.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostState, Blog])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
