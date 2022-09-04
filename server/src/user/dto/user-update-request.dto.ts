import { IsEmpty, IsString } from 'class-validator';

export class UserUpdateRequestDto {
  @IsString()
  username: string;

  @IsString()
  shortWord: string;

  @IsString()
  profileImageUrl: string;
}
