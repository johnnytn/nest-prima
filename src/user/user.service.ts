import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { generatePassword, hashPassword } from 'src/utils/utils';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { email, role } = createUserDto;
      const generatedPassword = generatePassword();
      const password = await hashPassword(generatedPassword);

      await this.prismaService.user.create({
        data: {
          email,
          role,
          password,
        },
      });
      return {
        email,
        password: generatedPassword,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }
  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  /* findByLogin(email: string, password: string) {
    return this.prismaService.user.findFirst({
      where: { email, password },
    });
  } */

  update(id: string, payload: UpdateUserDto) {
    return this.prismaService.user.update({
      data: payload,
      where: {
        id,
      },
    });
  }
  remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
