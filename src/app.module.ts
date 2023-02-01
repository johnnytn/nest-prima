import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma';
import { UserController } from './user/user.controller';

import { UserService } from './user/user.service';

@Module({
  imports: [AppModule, PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserController, UserService],
})
export class AppModule {}
