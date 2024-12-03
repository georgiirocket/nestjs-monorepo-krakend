import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@app/libs/dto/auth/token-payload';
import { Tokens } from '@app/libs/dto/auth/tokens';
import { accessExpireHours, refreshExpireDays } from '../constants';
import { addHours, addDays } from 'date-fns';

/**
 * Tokens service
 */
@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  /**
   * Get last part of string
   * @param str
   * @private
   */
  private getLastPartOfString(str: string): string {
    return str.substring(str.length - 6);
  }

  /**
   * Check last 6 characters
   */
  checkBunchTokens(token: string, partStr: string): boolean {
    return this.getLastPartOfString(token) === partStr;
  }

  /**
   * Generate tokens
   * @param data
   */
  async generateTokens(
    data: Pick<TokenPayload, 'userId' | 'role'>,
  ): Promise<Tokens> {
    const expiresInAccess = addHours(new Date(), accessExpireHours).getTime();
    const expiresInRefresh = addDays(new Date(), refreshExpireDays).getTime();

    const accessToken = await this.jwtService.signAsync(
      { type: 'access', ...data } as TokenPayload,
      { expiresIn: expiresInAccess },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        type: 'refresh',
        partAccessString: this.getLastPartOfString(accessToken),
        ...data,
      } as TokenPayload,
      { expiresIn: expiresInRefresh },
    );

    return {
      accessToken,
      refreshToken,
      expiresAt: expiresInAccess,
      expires: expiresInRefresh,
    };
  }

  /**
   * Verify token
   * @param token
   */
  async verifyToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verify<TokenPayload>(token);
  }
}
