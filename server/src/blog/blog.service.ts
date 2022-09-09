import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/model/user.entity';
import { BlogCreateRequestDto } from './dto/blog-create-request.dto';
import { Blog } from './model/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(user: User, request: BlogCreateRequestDto) {
    const exist = user.blog;

    if (exist) {
      throw new ConflictException('Blog already exists');
    }

    try {
      const createdBlog = this.blogRepository.create({ ...request, user });
      await this.blogRepository.save(createdBlog);
    } catch {
      throw new ConflictException('Duplicate userId');
    }
  }
}
