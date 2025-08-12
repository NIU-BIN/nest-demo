import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn, CreateDateColumn, JoinTable } from 'typeorm';
import { Account } from './account.entity';
import { Product } from './product.entity';

// 订单状态
export enum OrderStatus {
  PENDING = 'PENDING', // 待支付
  PAID = 'PAID', // 已支付
  CANCELED = 'CANCELED', // 已取消
}

@Entity('t_order')
export class Order {
  @PrimaryGeneratedColumn('uuid', {
    comment: '订单id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '订单名称',
  })
  order_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '订单描述',
  })
 order_desc: string;

  @Column({
    type: 'decimal',
    precision: 12, // 总位数
    scale: 2, // 小数位数
    comment: '订单总金额（元）',
  })
  total_amount: number;

  @Column({
    type: 'enum',
    default: OrderStatus.PENDING,
    enum: OrderStatus,
    comment: '订单状态',
  })
  status: OrderStatus;

  /*
    订单创建时间（自动生成，无需手动设置）
    使用 CreateDateColumn 会自动在插入时设置为当前时间
  */
  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    comment: '订单创建时间',
  })
  createdAt: Date;

  /* 
    自动在数据更新时刷新
  */
  @Column({
    type: 'datetime',
    name: 'updated_at',
    nullable: true,
    comment: '订单更新时间',
  })
  updatedAt?: Date;

  @ManyToOne(() => Account, (account) => account.orders)
  @JoinColumn({
    name: 'account_id',
  })
  account: Account;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: 't_order_product', // 中间表名称
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}