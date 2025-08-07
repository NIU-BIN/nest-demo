import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { Account } from './account.entity';
import { Product } from './product.entity';

@Entity('t_order')
export class Order {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '订单详情id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '订单详情名称',
  })
  order_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '订单详情描述',
  })
 order_desc: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '订单详情类别',
  })
  order_category: string;

  @ManyToOne(() => Account, (account) => account.orders)
  account: Account;

  @ManyToMany(() => Product)
  @JoinColumn()
  products: Product[];
}