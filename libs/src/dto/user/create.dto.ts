import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Create dto
 */
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({ example: 'Piter', required: true })
  name: string;
}
