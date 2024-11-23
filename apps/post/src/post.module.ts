import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaModule } from '@app/libs/modules/database/prisma.module';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';

/**
 * Module
 */
@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService, MicroService.register(SERVICE_NAMES.USER)],
})
export class PostModule {}
