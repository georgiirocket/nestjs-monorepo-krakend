import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Create dto
 */
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({ example: 'Piter', required: true })
  name: string;

  @IsString()
  @MinLength(10)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty({ example: 'jsvjbshfvbhbv645', required: true })
  password: string;
}
