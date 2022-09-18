import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
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
  async follow(
    @AuthUser() user: User,
    @Body('followingId') followingId: number,
  ) {
    await this.followService.follow(user.id, followingId);
  }
}
