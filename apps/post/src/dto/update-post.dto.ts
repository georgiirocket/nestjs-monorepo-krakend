import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

/**
 * Update dto
 */
export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
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
