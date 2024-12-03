import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '@app/libs/dto/auth/token-payload';

/**
 * Token payload params
 */
export const TokenPayloadParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TokenPayload => {
    return ctx.switchToHttp().getRequest()['tokenPayload'];
  },
);
