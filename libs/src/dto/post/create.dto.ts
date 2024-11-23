import { IsInt, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Create dto
 */
export class CreatePostDto {
  @IsString()
  @MinLength(5)
  @ApiProperty({ example: 'Title', required: true })
  title: string;

  @IsString()
  @MinLength(10)
  @ApiProperty({ example: 'Hello world', required: true })
  description: string;

  @IsInt()
  @ApiProperty({ example: 1, required: true })
  authorId: number;
}
