import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { TokenPayload } from '@app/libs/dto/auth/token-payload';
import { AUTH_PATTERNS } from '@app/libs/constants/patterns/auth';

/**
 * A guard that checks for a valid JWT token and extracts the token payload.
 * If the token is valid, it sets the payload as a property on the request object.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(SERVICE_NAMES.AUTH) private readonly authServices: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid type token');
    }

    const payload = await this.getPayload(token ?? '').catch((error) => {
      throw new UnauthorizedException(error);
    });

    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid type token');
    }

    request['tokenPayload'] = payload;
    return true;
  }

  private async getPayload(token: string): Promise<TokenPayload> {
    return firstValueFrom(
      this.authServices
        .send<TokenPayload, string>(AUTH_PATTERNS.VERIFY_TOKEN, token)
        .pipe(
          catchError((error) => {
            throw new UnauthorizedException(error.message ?? 'Bad token');
          }),
        ),
    );
  }
}
