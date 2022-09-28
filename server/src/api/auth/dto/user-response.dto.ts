import { User } from '../../../entity/user.entity';

export default class UserResponseDto {
  id: number;
  username: string;
  profileImageUrl: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.profileImageUrl = user.profileImageUrl;
  }
}
