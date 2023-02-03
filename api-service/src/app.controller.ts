import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { Roles } from './auth/decorators/roles.decorator';
import { JwtAuthGuard, Public } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

import { CreateUserDto } from './user/dto/create-user.dto';
import { RoleType } from './user/entities/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // For yours praticality theese endpoints were moved to the root as well
  @Public()
  @Post('/register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/history')
  getHistories(@Request() req) {
    return this.userService.findHistoriesByUserId(req.user?.userId);
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/stats')
  getStats() {
    return this.userService.findMostRequestedStocks();
  }

  @Public()
  @Post('reset-passowrd')
  async resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }
}
