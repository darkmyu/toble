import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/model/user.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './model/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
