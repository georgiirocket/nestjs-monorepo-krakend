import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Update dto
 */
export class UpdateUserDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  @MinLength(2)
  @ApiProperty({ example: 'Piter@test.com', required: false })
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty({ example: 'jsvjbshfvbhbv645', required: false })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Piter', required: false })
  imageUrl?: string;
}
