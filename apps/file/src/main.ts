import { NestFactory } from '@nestjs/core';
import { FileModule } from './file.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';

/**
 * File app
 */
async function bootstrap() {
  const app = await NestFactory.create(FileModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs monorepo')
    .setDescription('Description for API')
    .setVersion('1.0')
    .addTag('File app')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(MicroService.getOptions(SERVICE_NAMES.FILE));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('file/api-documentation', app, document);

  await app.startAllMicroservices();
  await app.listen(process.env.FILE_APP_PORT as string);
}

void bootstrap();
