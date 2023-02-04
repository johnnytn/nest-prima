import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';

import { AuthController } from './auth.controller';
import { PrismaModule } from 'nestjs-prisma';
import { jwtConstants } from '../commons/constants/jwt.constants';

import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    PrismaModule.forRoot(),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    MailService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
