import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    const { email, role } = createUserDto;
    const password = '1213'; // TODO: encrypt
    return this.prismaService.user.create({
      data: {
        email,
        role,
        password,
      },
    });
    // return 'This action adds a new user';
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

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
