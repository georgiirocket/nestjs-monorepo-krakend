import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '@app/libs/modules/database/prisma.module';
import { UserService } from './user.service';

/**
 * Module
 */
@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
