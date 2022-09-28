import { User } from '../../../entity/user.entity';

export class PostUserResponseDto {
  username: string;
  displayName: string;
  profileImageUrl: string;

  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.profileImageUrl = user.profileImageUrl;
  }
}
