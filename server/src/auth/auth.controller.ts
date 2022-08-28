import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { OAuthRequestDto } from './dto/oauth-request.dto';
import { GoogleGuard } from './guard/google.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  async google() {
    // callback url
  }

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as OAuthRequestDto;
    const { accessToken, refreshToken } = await this.authService.login(user);

    this.createCookies(res, accessToken, refreshToken);
    return res.redirect('/');
  }

  createCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24 * 7,
    });
  }
}
