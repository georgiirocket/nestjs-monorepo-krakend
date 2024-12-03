import {
  CanActivate,
  ExecutionContext,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@app/libs/models/user/model';
import { TokenPayload } from '@app/libs/dto/auth/token-payload';

/**
 * A class that implements the CanActivate interface and serves as a guard for checking user role.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const guardRole = this.reflector.get<Role>('role', context.getHandler());

    if (!guardRole) {
      return true;
    }

    const user = request?.tokenPayload as TokenPayload | undefined;

    if (!user || user.role !== guardRole) {
      throw new MethodNotAllowedException('method not allowed');
    }

    return true;
  }
}
