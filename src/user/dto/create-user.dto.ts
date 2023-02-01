import { ApiProperty } from '@nestjs/swagger';
import { Passowrd } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Passowrd;
}
