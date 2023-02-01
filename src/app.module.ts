import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from 'nestjs-prisma';
import { UserController } from './user/user.controller';

import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AppModule, PrismaModule.forRoot(), AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserController, UserService],
})
export class AppModule {}
