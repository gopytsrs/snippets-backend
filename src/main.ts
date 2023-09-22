import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // CORS
  app.enableCors();
  // Logging
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('snippets-service')
    .setDescription('REST enpoints for snippets backend service')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Req validation
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  // Start
  await app.listen(3000);
}
bootstrap();
