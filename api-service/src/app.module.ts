import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from 'nestjs-prisma';
import { UserController } from './user/user.controller';

import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stock.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [AppModule, PrismaModule.forRoot(), AuthModule, StockModule, MailModule],
  controllers: [AppController],
  providers: [AppService, UserService, AuthService, JwtService],
})
export class AppModule {}
