import { CreateUserDto } from './create.dto';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Update dto
 */
export class UpdateUserDto extends CreateUserDto {
  @IsInt()
  @ApiProperty({ example: 1, required: true })
  id: number;
}
