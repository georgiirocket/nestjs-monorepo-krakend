import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('users/api-documentation', app, document);

  await app.listen(process.env.USER_APP_PORT as string);
}

void bootstrap();
