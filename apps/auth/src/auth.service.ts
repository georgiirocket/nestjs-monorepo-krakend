import { PrismaService } from '@app/libs/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserModel } from '@app/libs/models/user/model';

/**
 * Service
 */
@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get user
   * @param email
   */
  async getUser(email: string): Promise<UserModel | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
