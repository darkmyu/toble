import { IsString } from 'class-validator';

export class BlogCreateRequestDto {
  @IsString()
  username: string;

  @IsString()
  title: string;
}
