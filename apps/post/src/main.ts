import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { ExceptionUpFilter } from '@app/libs/filters/exception-up.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

/**
 * Post app (service)
 */
async function bootstrap() {
  const app = await NestFactory.create(PostModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs monorepo')
    .setDescription('Description for API')
    .setVersion('1.0')
    .addTag('Post app')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionUpFilter(SERVICE_NAMES.POST));
  app.connectMicroservice(MicroService.getOptions(SERVICE_NAMES.POST));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);

  await app.listen(process.env.POST_APP_PORT);
}

void bootstrap();
