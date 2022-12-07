import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../../entity/comment.entity';
import { PostState } from '../../entity/post-state.entity';
import { Post } from '../../entity/post.entity';
import { Blog } from './../../entity/blog.entity';
import { CommentService } from './comment/comment.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostState, Blog, Comment])],
  controllers: [PostController],
  providers: [PostService, CommentService],
})
export class PostModule {}
