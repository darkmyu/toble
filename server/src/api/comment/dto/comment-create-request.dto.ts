import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CommentCreateRequestDto {
  @IsNumber()
  postId: number;

  @IsOptional()
  @IsNumber()
  parentId: number;

  @IsString()
  content: string;
}
