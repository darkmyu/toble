import { User } from '../../../entity/user.entity';

export class PostUserResponseDto {
  id: number;
  username: string;
  displayName: string;
  profileImageUrl: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.displayName = user.displayName;
    this.profileImageUrl = user.profileImageUrl;
  }
}
