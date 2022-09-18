import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/model/user.entity';
import { FollowService } from './../follow/follow.service';
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
    private readonly followService: FollowService,
  ) {}

  async findOne(username: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.blog', 'blog')
        .where('user.username = :username', { username })
        .getOne();

      const favoritesCount = await this.followService.findFavoritesCount(
        user.id,
      );

      const followersCount = await this.followService.findFollowersCount(
        user.id,
      );

      return new BlogResponseDto(user, favoritesCount, followersCount);
    } catch {
      throw new NotFoundException('Blog not found');
    }
  }

  async create(user: User, request: BlogCreateRequestDto) {
    const exist = await this.blogRepository.findOneBy({ userId: user.id });

    if (exist) {
      throw new ConflictException('Blog already exists');
    }

    try {
      const createdBlog = this.blogRepository.create({ ...request, user });
      await this.blogRepository.save(createdBlog);
      await this.userRepository.update(user.id, { username: request.username });
      return request.username;
    } catch {
      throw new ConflictException('Duplicate userId');
    }
  }
}
