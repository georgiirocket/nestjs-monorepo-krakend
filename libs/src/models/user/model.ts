import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

/**
 * Model
 */
export class UserModel implements User {
  @ApiProperty({ example: 'test111' })
  id: string;

  @ApiProperty({ example: '1234' })
  password: string;

  @ApiProperty({ example: 'User' })
  role: User['role'];

  @ApiProperty({ example: 'image.png' })
  imageUrl: string | null;

  @ApiProperty({ example: 'Joi@gmail.com' })
  email: string;

  @ApiProperty({ example: '2024-11-21T16:38:56Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-11-21T16:38:56Z' })
  updatedAt: Date;
}
