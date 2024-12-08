import { File } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Model
 */
export class FileModel implements File {
  @ApiProperty({ example: 'test111' })
  id: string;

  @ApiProperty({ example: 'fieldname' })
  fieldname: string;

  @ApiProperty({ example: 'originalname' })
  originalname: string;

  @ApiProperty({ example: 'encoding' })
  encoding: string;

  @ApiProperty({ example: 'mimetype' })
  mimetype: string;

  @ApiProperty({ example: 'destination' })
  destination: string;

  @ApiProperty({ example: 'filename' })
  filename: string;

  @ApiProperty({ example: 'filename' })
  path: string;

  @ApiProperty({ example: 233435 })
  size: number;

  @ApiProperty({ example: '2024-11-21T16:38:56Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-11-21T16:38:56Z' })
  updatedAt: Date;

  @ApiProperty({ example: false, default: false })
  isDelete: boolean;

  @ApiProperty({ example: 'authorId' })
  authorId: string;
}
