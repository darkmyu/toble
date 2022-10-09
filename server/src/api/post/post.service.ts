import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostState } from '../../entity/post-state.entity';
import { Post } from '../../entity/post.entity';
import { PostCreateRequestDto } from './dto/post-create-request.dto';
import { PostCreateResponseDto } from './dto/post-create-response.dto';
import { PostListResponseDto } from './dto/post-list-response.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostState)
    private readonly postStateRepository: Repository<PostState>,
  ) {}

  async findAll() {
    const findPosts = await this.postRepository.find({
      relations: { user: true, postState: true },
      order: { createdAt: 'DESC' },
    });

    const posts = findPosts.map((post) => new PostListResponseDto(post));
    return posts;
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
