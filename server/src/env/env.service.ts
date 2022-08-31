import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  private HOST = this.configService.get('API_HOST');

  getHost() {
    return this.configService.get('NODE_ENV') === 'development'
      ? 'localhost'
      : `${this.HOST}`;
  }

  getRedirectUrl() {
    return this.configService.get('NODE_ENV') === 'development'
      ? 'http://localhost:3000'
      : `https://${this.HOST}`;
  }
}
