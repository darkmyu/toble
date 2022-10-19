import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { OAuthRequestDto } from './dto/oauth-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(request: OAuthRequestDto) {
    const { socialId, provider } = request;
    const exist = await this.userService.findBySocialIdAndProvider(
      socialId,
      provider,
    );

    if (exist) {
      return this.createToken(exist.id);
    }

    const user = await this.userService.save(request);
    return this.createToken(user.id);
  }

  async validateRefreshToken(id: number, refreshToken: string) {
    const result = await this.userService.validateRefreshToken(
      id,
      refreshToken,
    );

    if (!result) {
      throw new UnauthorizedException('RefreshToken does not match');
    }

    const accessToken = this.jwtService.sign(
      { id, sub: 'access_token' },
      { expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN') },
    );

    return accessToken;
  }

  async createToken(id: number) {
    const accessToken = this.jwtService.sign(
      { id, sub: 'access_token' },
      { expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN') },
    );
    const refreshToken = this.jwtService.sign(
      { id, date: Date.now(), sub: 'refresh_token' },
      { expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN') },
    );

    await this.userService.setHashedRefreshToken(id, refreshToken);

    return { accessToken, refreshToken };
  }
}
