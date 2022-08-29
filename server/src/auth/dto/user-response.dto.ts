import { User } from '../../user/model/user.entity';

export default class UserResponseDto {
  id: number;
  username: string;
  shortWord: string;
  profileImageUrl: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.shortWord = user.shortWord;
    this.profileImageUrl = user.profileImageUrl;
    this.email = user.email;
  }
}
