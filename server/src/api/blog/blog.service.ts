import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogTopic } from '../../entity/blog-topic.entity';
import { Blog } from '../../entity/blog.entity';
import { User } from '../../entity/user.entity';
import { FollowService } from './../follow/follow.service';
import { BlogCreateRequestDto } from './dto/blog-create-request.dto';
import { BlogResponseDto } from './dto/blog-response.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BlogTopic)
    private readonly blogTopicRepository: Repository<BlogTopic>,
    private readonly followService: FollowService,
  ) {}

  async findOne(username: string) {
    try {
      const user = await this.userRepository.findOne({
        relations: { blog: true },
        where: { username },
      });

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

    const blogTopic = await this.blogTopicRepository.findOneBy({
      id: request.blogTopicId,
    });

    if (!blogTopic) {
      throw new NotFoundException('Topic is not found');
    }

    try {
      const createdBlog = this.blogRepository.create({
        title: request.title.replace(/ +(?= )/g, ''),
        user,
        blogTopic,
      });
      await this.blogRepository.save(createdBlog);
      await this.userRepository.update(user.id, { username: request.username });
      return { username: request.username };
    } catch {
      throw new ConflictException('Duplicate userId');
    }
  }

  async findTopics() {
    return this.blogTopicRepository.find({
      select: { id: true, name: true },
    });
  }
}
