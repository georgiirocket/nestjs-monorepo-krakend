import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';

@Module({
  controllers: [PostController],
  providers: [MicroService.register(SERVICE_NAMES.POST)],
})
export class PostModule {}
