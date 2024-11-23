import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';

/**
 * User module
 */
@Module({
  controllers: [UserController],
  providers: [MicroService.register(SERVICE_NAMES.USER)],
})
export class UserModule {}
