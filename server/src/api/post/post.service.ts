import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostState } from '../../entity/post-state.entity';
import { Post } from '../../entity/post.entity';
import { Page } from '../../utils/page';
import { PostCreateRequestDto } from './dto/post-create-request.dto';
import { PostCreateResponseDto } from './dto/post-create-response.dto';
import { PostResponseDto } from './dto/post-response.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostState)
    private readonly postStateRepository: Repository<PostState>,
  ) {}

  async findAll(page: number, size: number) {
    const offset = (page - 1) * size;

    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.postState', 'postState')
      .limit(size)
      .offset(offset)
      .orderBy('post.createdAt', 'DESC');

    const findPosts = await query.getMany();

    const posts = findPosts.map(
      ({ content, ...post }) => new PostResponseDto(post),
    );

    const totalCount = await this.postRepository.count();

    return new Page<PostResponseDto>(totalCount, page, size, posts);
  }

  async create(userId: number, post: PostCreateRequestDto) {
    if (!post.description) {
      post.description = post.content.replace(/<[^>]*>?/g, '').slice(0, 60);
    }

    const createdPost = this.postRepository.create({ ...post, userId });
    const createdPostState = this.postStateRepository.create({
      postId: createdPost.id,
    });

    createdPost.postState = createdPostState;

    const savedPost = await this.postRepository.save(createdPost);

    if (!savedPost) {
      throw new InternalServerErrorException('Post save fail');
    }

    return new PostCreateResponseDto(savedPost.id);
  }
}
