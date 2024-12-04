import { UserDto } from '@app/libs/dto/user/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from '@app/libs/dto/auth/tokens';

export class LoginResDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({ type: Tokens })
  auth: Tokens;
}
