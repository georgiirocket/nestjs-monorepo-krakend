import { Post } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto
 */
export class PostDto implements Post {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Title' })
  title: string;

  @ApiProperty({ example: 'Hello word!!!' })
  description: string;

  @ApiProperty({ example: '2024-11-21T16:38:56Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-11-21T16:38:56Z' })
  updatedAt: Date;

  @ApiProperty({ example: 1, nullable: true })
  authorId: number | null;
}
