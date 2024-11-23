import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto
 */
export class UserDto implements User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Joi' })
  name: string;

  @ApiProperty({ example: '2024-11-21T16:38:56Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-11-21T16:38:56Z' })
  updatedAt: Date;
}
