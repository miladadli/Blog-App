import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { Request, Response, NextFunction } from 'express';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
      Logger.log(
        `Incoming Request: ${req.method} ${req.url} - Query: ${JSON.stringify(req.query)}`,
        'RequestLogger',
      );
    } else {
      Logger.log(
        `Incoming Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`,
        'RequestLogger',
      );
    }

    const originalSend = res.send;

    res.send = function (...args) {
      Logger.log(
        `Response: ${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent - Body: ${args[0]}`,
        'ResponseLogger',
      );
      return originalSend.apply(this, args);
    };

    next();
  });

  await app.listen(3000, () => {
    Logger.log('Server is running on http://localhost:3000', 'Bootstrap');
  });
}
bootstrap();
