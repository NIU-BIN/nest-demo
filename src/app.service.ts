import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity'
import { Register } from './entity/register.entity'
import { Account } from './entity/account.entity';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from './entity/order.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // 新增产品和产品注册信息数据
  /* async inertData() {
    const register = this.registerRepository.create({
      register_name: 'XXX薯片',
      register_desc: 'XXXX公司生产的薯片',
      register_category: '食品',
    })
    await this.registerRepository.save(register)
    const product = this.productRepository.create({
      product_name: '薯片',
      product_desc: 'XXX薯片，香脆可口',
      product_category: '食品',
      product_price: 12.5,
      register: register
    })
    await this.productRepository.save(product)
    return 'success'
  } */

  // 新增账户和订单数据
  /* async inertData() {
    const account = this.accountRepository.create({
      account_name: '张三',
      account_desc: '张三的账户',
    });
    await this.accountRepository.save(account);
    const order = this.orderRepository.create({
      order_name: '订单1',
      order_desc: '订单1的描述',
      total_amount: 100,
      status: OrderStatus.PENDING,
      account,
    });
    const order2 = this.orderRepository.create({
      order_name: '订单2',
      order_desc: '订单2的描述',
      total_amount: 200,
      status: OrderStatus.PAID,
      account,
    });
    await this.orderRepository.save([order, order2]);
    return 'success'
  } */

  // 新增产品和订单的数据
  async inertData() {
    const product1 = this.productRepository.create({
      product_name: '锅巴',
      product_desc: 'XXX锅巴，香的窜天',
      product_category: '食品',
      product_price: 10.5,
    })
    const product2 = this.productRepository.create({
      product_name: '辣条',
      product_desc: 'XXX辣条，辣你两头',
      product_category: '食品',
      product_price: 6.5,
    })
    await this.productRepository.save([product1, product2])
    // 先找出张三的账户，创建新的订单，并关联上
    const account = await this.accountRepository.findOne({
      where: { account_name: '张三' }
    })
    if(account) {
      const order = this.orderRepository.create({
        order_name: '多对多的订单',
        order_desc: '多对多的订单的描述',
        total_amount: 100,
        status: OrderStatus.PENDING,
        products: [product1, product2],
        account
      })
      await this.orderRepository.save(order)
      return 'success'
    } else {
      return 'error'
    }
  }

  getProducts() {
    const products = this.productRepository.createQueryBuilder('product')
    .leftJoinAndSelect('product.register', 'register')
    .getMany()
    return products;
  }

  getALlAccountOrders() {
    const orders = this.accountRepository.createQueryBuilder('account')
    .leftJoinAndSelect('account.orders', 'orders')
    .getMany()
    return orders;
  }

  // 获取指定账户下的所有订单
  getTargetAccountOrder(name: string) {
    const orders = this.accountRepository.createQueryBuilder('account')
      .leftJoinAndSelect('account.orders', 'orders')
      .where('account.account_name = :name', { name })
      .getMany();
    return orders;
  }

  // 获取指定订单下的所有产品
  getProductsByOrder(id: string) {
    const products = this.orderRepository.createQueryBuilder('order')
    .leftJoinAndSelect('order.products', 'products')
    .where('order.id = :id', { id })
    .getMany()
    return products;
  }

  // 获取包含该产品的所有订单
  getOrdersByProduct(id: string) {
    const orders = this.productRepository.createQueryBuilder('product')
    .leftJoinAndSelect('product.orders', 'orders')
    .where('product.id = :id', { id })
    .getMany()
    return orders;
  }
}
