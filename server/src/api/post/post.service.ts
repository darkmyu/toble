import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostState } from '../../entity/post-state.entity';
import { Post } from '../../entity/post.entity';
import { Page } from '../../utils/page';
import { Blog } from './../../entity/blog.entity';
import { CommentService } from './comment/comment.service';
import { PostAndCommentResponseDto } from './dto/post-and-comment-response.dto';
import { PostCreateRequestDto } from './dto/post-create-request.dto';
import { PostCreateResponseDto } from './dto/post-create-response.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { PostUpdateRequestDto } from './dto/post-update-request.dto';
import { PostUpdateResponseDto } from './dto/post-update-response.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostState)
    private readonly postStateRepository: Repository<PostState>,
    private readonly commentService: CommentService,
  ) {}

  async findAll(page: number, size: number) {
    const offset = (page - 1) * size;

    const findPosts = await this.postRepository.find({
      relations: { user: true, postState: true },
      take: size,
      skip: offset,
      order: { createdAt: 'DESC' },
    });

    const posts = findPosts.map(
      ({ content, ...post }) => new PostResponseDto(post),
    );

    const totalCount = await this.postRepository.count();

    return new Page<PostResponseDto>(totalCount, page, size, posts);
  }

  async findOne(id: number) {
    const findPost = await this.postRepository.findOne({
      relations: { user: true, postState: true },
      where: { id },
    });

    if (!findPost) throw new NotFoundException('Post is not found');

    const post = new PostResponseDto(findPost);
    const comments = await this.commentService.find(id);

    return new PostAndCommentResponseDto(post, comments);
  }

  async create(userId: number, post: PostCreateRequestDto) {
    const findBlog = await this.blogRepository.findOneBy({ userId });

    if (!findBlog) {
      throw new NotFoundException('Blog is not found');
    }

    if (!post.description) {
      post.description = post.content.replace(/<[^>]*>?/g, '').slice(0, 80);
    }

    const createdPost = this.postRepository.create({ ...post, userId });
    createdPost.postState = this.postStateRepository.create({
      postId: createdPost.id,
    });

    const savedPost = await this.postRepository.save(createdPost);

    if (!savedPost) {
      throw new InternalServerErrorException('Post save fail');
    }

    return new PostCreateResponseDto(savedPost.id);
  }

  async update(userId: number, postId: number, request: PostUpdateRequestDto) {
    const findPost = await this.postRepository.findOne({
      relations: { user: true },
      where: { id: postId },
    });

    if (userId !== findPost.user.id) {
      throw new ForbiddenException('You are not the owner of the post');
    }

    /**
     * @todo add thumbnail, description logic
     */
    findPost.title = request.title;
    findPost.content = request.content;

    const savedPost = await this.postRepository.save(findPost);

    if (!savedPost) {
      throw new InternalServerErrorException('Post save fail');
    }

    return new PostUpdateResponseDto(savedPost.id);
  }
}
