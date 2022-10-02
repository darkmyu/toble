import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostState } from '../../entity/post-state.entity';
import { Post } from '../../entity/post.entity';
import { PostListResponseDto } from './dto/post-list-response.dto';
import { PostCreateRequestDto } from './dto/post-create-request.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostState)
    private readonly postStateRepository: Repository<PostState>,
  ) {}

  async findAll() {
    const findPosts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.postState', 'postState')
      .getMany();

    const posts = findPosts.map((post) => new PostListResponseDto(post));
    return posts;
  }

  async create(userId: number, post: PostCreateRequestDto) {
    const createdPost = this.postRepository.create({ ...post, userId });
    const createdPostState = this.postStateRepository.create({
      postId: createdPost.id,
    });

    createdPost.postState = createdPostState;
    await this.postRepository.save(createdPost);
  }
}
