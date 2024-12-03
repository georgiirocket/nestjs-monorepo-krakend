import { IsString, Matches, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Create dto
 */
export class CreateUserDto {
  @IsString()
  @IsEmail()
  @MinLength(2)
  @ApiProperty({ example: 'piter@gmail.com', required: true })
  email: string;

  @IsString()
  @MinLength(10)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty({ example: 'password', required: true })
  password: string;
}
