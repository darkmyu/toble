import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EnvService } from '../../env/env.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtAuthStrategy } from './strategy/jwt-auth.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    JwtAuthStrategy,
    AuthService,
    EnvService,
    ConfigService,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
