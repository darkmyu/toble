import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTopic } from '../../entity/blog-topic.entity';
import { Blog } from '../../entity/blog.entity';
import { Follow } from '../../entity/follow.entity';
import { User } from '../../entity/user.entity';
import { FollowService } from './../follow/follow.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User, Follow, BlogTopic])],
  controllers: [BlogController],
  providers: [BlogService, FollowService],
})
export class BlogModule {}
