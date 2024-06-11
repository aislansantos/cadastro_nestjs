import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// ! Criando a estrutura do Swagger
export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Teste')
    .setDescription('Projeto de Aula de NestJs')
    .setVersion('1.0.0Beta')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'json',
    yamlDocumentUrl: 'yaml',
    swaggerOptions: {
      docExpansion: 'none',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enableCors ja está instalado no express, e o nest usa o express de base neste caso.
  app.enableCors({
    methods: '*',
    origin: '*',
  });

  // Usando o Swagger
  setupSwagger(app);

  // Usando o class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
