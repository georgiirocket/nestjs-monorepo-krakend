import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AUTH_PATTERNS } from '@app/libs/constants/patterns/auth';
import { TokenPayload } from '@app/libs/dto/auth/token-payload';
import { TokenService } from './services/token.service';
import { PasswordService } from './services/password.service';
import { ExceptionUpFilter } from '@app/libs/filters/exception-up.filter';
import { SERVICE_NAMES } from '@app/libs/constants/services';

@Controller()
@UseFilters(new ExceptionUpFilter(SERVICE_NAMES.AUTH))
export class CommunicationController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  /**
   * Verify token
   */
  @MessagePattern(AUTH_PATTERNS.VERIFY_TOKEN)
  async checkToken(token: string): Promise<TokenPayload> {
    return await this.tokenService.verifyToken(token);
  }

  /**
   * Create hash password
   */
  @MessagePattern(AUTH_PATTERNS.CREATE_HASH_PASSWORD)
  async createHash(password: string): Promise<string> {
    return await this.passwordService.createHash(password);
  }
}
