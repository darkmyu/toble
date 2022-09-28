import { IsNumber, IsString } from 'class-validator';

export class BlogCreateRequestDto {
  @IsString()
  username: string;

  @IsString()
  title: string;

  @IsNumber()
  blogTopicId: number;
}
