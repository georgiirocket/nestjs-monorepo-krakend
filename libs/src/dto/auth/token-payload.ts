import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@app/libs/models/user/model';

/**
 * Dto
 */
export class TokenPayload {
  @IsString()
  @ApiProperty({ example: 'token' })
  userId: string;

  @IsString()
  @ApiProperty({ example: 'token' })
  role: Role;

  @IsString()
  @ApiProperty({ example: 'access' })
  type: 'access' | 'refresh';

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'string' })
  partAccessString: string;
}
