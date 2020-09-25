/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BankidModule } from './bankid/bankid.module';

async function bootstrap() {
  const app = await NestFactory.create(BankidModule);
  const options = new DocumentBuilder()
    .setTitle('BankID example')
    .setDescription('This is a demoservice for bankid')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3333;
  app.enableCors({ origin: ['http://localhost:8080'] });
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/');
  });
}

bootstrap();
