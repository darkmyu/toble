import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { OAuthRequestDto } from '../auth/dto/oauth-request.dto';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async save(request: OAuthRequestDto) {
    const user = this.userRepository.create(request);
    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async update(id: number, request: UserUpdateRequestDto) {
    try {
      const findUser = await this.userRepository.findOneBy({ id });
      findUser.displayName = request.displayName;
      findUser.profileImageUrl = request.profileImageUrl;

      return this.userRepository.save(findUser);
    } catch {
      throw new NotFoundException('User not found!');
    }
  }

  async validateRefreshToken(id: number, refreshToken: string) {
    const { refreshToken: hashedRefreshToken } =
      await this.userRepository.findOneBy({ id });

    return bcrypt.compare(refreshToken, hashedRefreshToken);
  }

  async setHashedRefreshToken(id: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    return this.userRepository.update(id, { refreshToken: hashedRefreshToken });
  }

  async removeHashedRefreshToken(id: number) {
    return this.userRepository.update({ id }, { refreshToken: null });
  }

  async findBySocialIdAndProvider(socialId: string, provider: string) {
    return this.userRepository.findOne({
      where: {
        socialId: socialId,
        provider: provider,
      },
    });
  }
}
