import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('posts/api-documentation', app, document);

  await app.listen(process.env.POST_APP_PORT as string);
}

void bootstrap();
