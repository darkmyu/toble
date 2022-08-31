import { Injectable, NestMiddleware } from '@nestjs/common';
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
      return res.status(401).send({
        statusCode: 401,
        message: 'API Unauthorized',
      });
    }

    if (accessToken === undefined && refreshToken) {
      try {
        const { id } = this.jwtService.verify(refreshToken);

        if (!id) {
          throw Error('Bad RefreshToken');
        }

        const freshAccessToken = await this.authService.validateRefreshToken(
          id,
          refreshToken,
        );

        const host = this.envService.getHost();

        res.cookie('access_token', freshAccessToken, {
          httpOnly: true,
          domain: host,
          maxAge: 60 * 60 * 1000,
        });

        res.redirect(req.originalUrl);
        next();
      } catch (error) {
        return res.status(401).send({
          statusCode: 401,
          message: 'API Unauthorized',
        });
      }
    }

    next();
  }
}
