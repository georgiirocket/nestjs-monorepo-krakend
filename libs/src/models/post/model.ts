import { Post } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto
 */
export class PostModel implements Post {
  @ApiProperty({ example: 'sdckksdcn' })
  id: string;

  @ApiProperty({ example: 'Title' })
  title: string;

  @ApiProperty({ example: 'Hello word!!!' })
  description: string;

  @ApiProperty({ example: '2024-11-21T16:38:56Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-11-21T16:38:56Z' })
  updatedAt: Date;

  @ApiProperty({ example: 'mskdlmcm' })
  authorId: string;
}
