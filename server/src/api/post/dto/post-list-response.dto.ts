import { PostResponseDto } from './post-response.dto';

export class PostListResponseDto {
  constructor(private posts: PostResponseDto[]) {}
}
