import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto
 */
export class Tokens {
  @IsString()
  @ApiProperty({ example: 'token' })
  accessToken: string;

  @IsString()
  @ApiProperty({ example: 'token' })
  refreshToken: string;

  @IsInt()
  @ApiProperty({ example: 747736488, description: 'Expired access token' })
  expiresAt: number;

  @IsInt()
  @ApiProperty({ example: 747736488, description: 'Expired refresh token' })
  expires: number;
}
