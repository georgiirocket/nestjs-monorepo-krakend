import { NestFactory } from '@nestjs/core';
import { FileModule } from './file.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('file/api-documentation', app, document);

  await app.listen(process.env.FILE_APP_PORT as string);
}

void bootstrap();
