import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { OAuthRequestDto } from '../auth/dto/oauth-request.dto';
import { User } from './model/user.entity';

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

  async findBySocialIdAndProvider(socialId: string, provider: string) {
    return this.userRepository.findOne({
      where: {
        socialId: socialId,
        provider: provider,
      },
    });
  }
}
