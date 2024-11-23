import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { ExceptionUpFilter } from '@app/libs/filters/exception-up.filter';

/**
 * Post service
 */
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PostModule,
    MicroService.getOptions(SERVICE_NAMES.POST),
  );

  app.useGlobalFilters(new ExceptionUpFilter(SERVICE_NAMES.POST));
  await app.listen();
}

void bootstrap();
