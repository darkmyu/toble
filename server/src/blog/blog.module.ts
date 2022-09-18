import { Follow } from './../follow/model/follow.entity';
import { FollowService } from './../follow/follow.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/model/user.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './model/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User, Follow])],
  controllers: [BlogController],
  providers: [BlogService, FollowService],
})
export class BlogModule {}
