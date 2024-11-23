import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Getaway
 */
async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Nestjs monorepo')
    .setDescription('Description for API')
    .setVersion('1.0')
    .addTag('Gateway')
    .build();

  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);

  await app.listen(configService.get('GATEWAY_PORT') as string);
}

void bootstrap();
