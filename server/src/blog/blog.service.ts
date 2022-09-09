import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/model/user.entity';
import { BlogCreateRequestDto } from './dto/blog-create-request.dto';
import { BlogResponseDto } from './dto/blog-response.dto';
import { Blog } from './model/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(userId: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.blog', 'blog')
        .where('user.id = :id', { id: userId })
        .getOne();

      const blog = await user.blog;

      return new BlogResponseDto(user, blog);
    } catch {
      throw new NotFoundException('User not found');
    }
  }

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
