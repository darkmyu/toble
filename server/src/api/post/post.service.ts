import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostState } from '../../entity/post-state.entity';
import { Post } from '../../entity/post.entity';
import { PostCreateRequestDto } from './dto/post-create-request.dto';
import { PostsResponseDto } from './dto/posts-response.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostState)
    private readonly postStateRepository: Repository<PostState>,
  ) {}

  async findAll() {
    const findPost = await this.postRepository.find();
    const posts = findPost.map((post) => new PostsResponseDto(post));
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
