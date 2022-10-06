import { IsOptional, IsString } from 'class-validator';

export class PostCreateRequestDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  thumbnail: string;
}
