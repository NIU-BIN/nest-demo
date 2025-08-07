import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Register } from './entity/register.entity';
import { Order } from './entity/order.entity'
import { Account } from './entity/account.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      username: 'root',
      password: '123456',
      host: '127.0.0.1',
      port: 3306,
      database: 'nest_demo', // 数据库名称
      autoLoadEntities: true, // 是否自动将实体类自动同步到数据库
      synchronize: true, // 定义数据库表结构与实体类字段同步
    }),
    TypeOrmModule.forFeature([Product, Register, Order, Account]),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
