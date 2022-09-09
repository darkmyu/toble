import { IsString } from 'class-validator';

export class UserUpdateRequestDto {
  @IsString()
  displayName: string;

  @IsString()
  shortWord: string;

  @IsString()
  profileImageUrl: string;
}
