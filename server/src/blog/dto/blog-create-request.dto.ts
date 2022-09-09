import { IsString } from 'class-validator';

export class BlogCreateRequestDto {
  @IsString()
  path: string;

  @IsString()
  name: string;
}
