import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { UserService } from './user.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param() id: number, @Body() request: UserUpdateRequestDto) {
    await this.userService.update(id, request);
  }
}
