import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/decorators/roles.decorator';
import { JwtAuthGuard, Public } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

import { CreateUserDto } from './user/dto/create-user.dto';
import { RoleType } from './user/entities/user.entity';
import { UserController } from './user/user.controller';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userController: UserController,
  ) {}

  @Public()
  @Post('/register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userController.create(createUserDto);
  }

  @Get('/history')
  getHistories(@Request() req) {
    return this.userController.getHistories(req);
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/stats')
  getStats() {
    console.log('fetch stats');
    return this.userController.getStats();
  }
}
