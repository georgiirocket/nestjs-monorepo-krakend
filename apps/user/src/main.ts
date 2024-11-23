import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { ExceptionUpFilter } from '@app/libs/filters/exception-up.filter';

/**
 * User service
 */
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    MicroService.getOptions(SERVICE_NAMES.USER),
  );

  app.useGlobalFilters(new ExceptionUpFilter(SERVICE_NAMES.USER));
  await app.listen();
}

void bootstrap();
