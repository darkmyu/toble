import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from '../user/decorator/user-decorator';
import { User } from '../user/model/user.entity';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { FollowService } from './follow.service';

@Controller('api/v1/follows')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async create(
    @AuthUser() user: User,
    @Body('followingId') followingId: number,
  ) {
    await this.followService.create(user.id, followingId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async delete(@AuthUser() user: User, @Param('id') followingId: number) {
    await this.followService.delete(user.id, followingId);
  }

  @Post('check')
  @UseGuards(JwtAuthGuard)
  async check(
    @AuthUser() user: User,
    @Body('followingId') followingId: number,
  ) {
    return this.followService.check(user.id, followingId);
  }
}
