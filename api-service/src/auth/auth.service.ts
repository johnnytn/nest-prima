import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

import { LoginUserDto } from './dto/login.dto';
import { generatePassword, hashPassword } from 'src/utils/utils';
import {
  USER_NOT_FOUND,
  USER_PASSWORD_RESETED,
} from 'src/commons/constants/user.constants';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  // TODO: add prisma model types or create
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }
    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const payload = { username: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Generate and update the user password
   * @param email
   * @returns
   */
  async resetPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const generatedPassword = generatePassword();
      const password = await hashPassword(generatedPassword);
      await this.userService.update(user.id, { password });

      // TODO: add email sender
      const message = USER_PASSWORD_RESETED(user.email);
      this.logger.log(message);
      return { message, password: generatedPassword };
    }
    throw new NotFoundException(USER_NOT_FOUND);
  }
}
