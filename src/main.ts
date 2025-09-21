import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validação automática via (class-validator)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Configuração do Swagger para documentação da API
  const config = new DocumentBuilder()
    .setTitle('API de Embalagem de Pedidos')
    .setDescription('API que decide quais caixas usar para pedidos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
  console.log(
    `🚀 Application is running on: http://localhost:${
      process.env.PORT || 3333
    }`,
  );
}

bootstrap();
