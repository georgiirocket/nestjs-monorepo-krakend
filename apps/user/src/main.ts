import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { ExceptionUpFilter } from '@app/libs/filters/exception-up.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * User app (service)
 */
async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs monorepo')
    .setDescription('Description for API')
    .setVersion('1.0')
    .addTag('User app')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionUpFilter(SERVICE_NAMES.USER));
  app.connectMicroservice(MicroService.getOptions(SERVICE_NAMES.USER));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);

  await app.listen(process.env.USER_APP_PORT);
}

void bootstrap();
