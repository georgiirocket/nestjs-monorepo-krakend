import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroService } from '@app/libs/services/micro/service';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Auth app (service)
 */
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs monorepo')
    .setDescription('Description for API')
    .setVersion('1.0')
    .addTag('Auth app')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(MicroService.getOptions(SERVICE_NAMES.AUTH));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('auth/api-documentation', app, document);

  await app.startAllMicroservices();
  await app.listen(process.env.AUTH_APP_PORT as string);
}

void bootstrap();
