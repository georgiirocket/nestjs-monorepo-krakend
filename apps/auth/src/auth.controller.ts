import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TokenPayload } from '@app/libs/dto/auth/token-payload';
import { TokenService } from './services/token.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from '@app/libs/dto/auth/tokens';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh';
import { TokenPayloadParams } from '@app/libs/decorators/token-payload';
import { AuthService } from './auth.service';
import { LoginResDto } from './dto/login-res.dto';
import { LoginReqDto } from './dto/login-req.dto';
import { PasswordService } from './services/password.service';
import { Role } from '@app/libs/models/user/model';
import { UserDto } from '@app/libs/dto/user/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Refresh token
   */
  @ApiCreatedResponse({ type: Tokens })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  async refreshToken(
    @Body() { accessToken }: RefreshTokenDto,
    @TokenPayloadParams() payload: TokenPayload,
  ): Promise<Tokens> {
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('invalid type token');
    }

    const isBunchTokens = this.tokenService.checkBunchTokens(
      accessToken,
      payload.partAccessString,
    );

    if (!isBunchTokens) {
      throw new UnauthorizedException('Bad bunch tokens');
    }

    return await this.tokenService.generateTokens({
      userId: payload.userId,
      role: payload.role,
    });
  }

  /**
   * Login
   */
  @ApiCreatedResponse({ type: LoginResDto })
  @Post('login')
  async login(@Body() { email, password }: LoginReqDto): Promise<LoginResDto> {
    const user = await this.authService.getUser(email);

    if (!user) {
      throw new UnauthorizedException('Check your credentials');
    }

    const isMatchPassword = await this.passwordService.comparePassword({
      password,
      hash: user.password,
    });

    if (!isMatchPassword) {
      throw new UnauthorizedException('Check your credentials');
    }

    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
      role: user.role as Role,
    });

    return { user: UserDto.omitPassword(user), auth: tokens };
  }
}
