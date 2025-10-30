import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigSchema } from './common/config/schema';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<ConfigSchema, true>);

  const port = configService.getOrThrow<number>('PORT');
  const baseUrl = configService.getOrThrow<string>('BASE_URL');
  const env = configService.getOrThrow<string>('NODE_ENV');

  // swagger openapi
  const swaggerPrefix = 'swagger';
  const config = new DocumentBuilder()
    .setTitle('AI Api')
    .setDescription('The AI API description')
    .setVersion(env.toUpperCase())
    .addServer(baseUrl)
    .addBearerAuth()
    .setExternalDoc('Postman Collection', `${swaggerPrefix}/json`)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(swaggerPrefix, app, document, {
    jsonDocumentUrl: `${swaggerPrefix}/json`,
  });

  // Middleware
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.enableShutdownHooks();

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${baseUrl}`);
  Logger.log(`📦 GraphQL is running on: ${baseUrl}/graphql`);
}
bootstrap();
