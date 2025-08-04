import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动移除未在 DTO 中定义的字段
      forbidNonWhitelisted: true, // 对未定义的字段抛出错误
      transform: true, // 自动将请求数据转换为 DTO 实例
      stopAtFirstError: true, // 在第一个验证错误时停止验证
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
