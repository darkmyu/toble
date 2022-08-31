import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  private HOST = this.configService.get('CLIENT_HOST');

  getHost() {
    return this.configService.get('NODE_ENV') === 'development'
      ? 'localhost'
      : `${this.HOST}`;
  }

  getRedirectUrl() {
    return this.configService.get('NODE_ENV') === 'development'
      ? 'http://localhost:3000/?social=1'
      : `https://${this.HOST}?social=1`;
  }
}
