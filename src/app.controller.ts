import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './guards/jwt-auth.guard';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserController } from './user/user.controller';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userController: UserController,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('/register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userController.create(createUserDto);
  }
}
