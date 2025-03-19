import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 // Establecer prefijo global para las rutas
 app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora propiedades desconocidas
      stopAtFirstError: true, // 🚀 Devuelve solo el primer error por campo
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
