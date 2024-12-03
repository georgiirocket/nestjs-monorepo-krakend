import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, IsOptional } from 'class-validator';

/**
 * Update dto
 */
export class UpdatePostDto {
  @IsInt()
  @ApiProperty({ example: 'string', required: true })
  id: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @ApiProperty({ example: 'Title', required: false })
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @ApiProperty({ example: 'Hello world', required: false })
  description?: string;
}
