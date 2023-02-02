import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateHistoryDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  metadata: Prisma.JsonValue;
}
