import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../services/token.service';

/**
 * A guard that checks for a valid JWT token and extracts the token payload.
 * If the token is valid, it sets the payload as a property on the request object.
 */
@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid type token');
    }

    const payload = await this.tokenService.verifyToken(token ?? '');

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid type token');
    }

    request['tokenPayload'] = payload;
    return true;
  }
}
