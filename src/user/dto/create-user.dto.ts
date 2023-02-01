import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  role: RoleType;
}
