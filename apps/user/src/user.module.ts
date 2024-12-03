import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '@app/libs/modules/database/prisma.module';
import { UserService } from './user.service';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';

/**
 * Module
 */
@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, MicroService.register(SERVICE_NAMES.AUTH)],
})
export class UserModule {}
