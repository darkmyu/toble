import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { EnvService } from '../env/env.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly envService: EnvService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];

    if (accessToken === undefined && refreshToken === undefined) {
      throw new UnauthorizedException();
    }

    if (accessToken === undefined && refreshToken) {
      const { id } = this.jwtService.verify(refreshToken);

      if (!id) {
        throw new UnauthorizedException();
      }

      const freshAccessToken = await this.authService.validateRefreshToken(
        id,
        refreshToken,
      );

      const host = this.envService.getHost();

      return res
        .cookie('access_token', freshAccessToken, {
          httpOnly: true,
          domain: host,
          maxAge: 60 * 60 * 1000,
        })
        .redirect(req.originalUrl);
    }

    next();
  }
}
