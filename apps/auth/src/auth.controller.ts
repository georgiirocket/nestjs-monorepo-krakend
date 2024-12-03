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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}

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
}
