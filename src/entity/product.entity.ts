import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Register } from './register.entity'
import { Order } from './order.entity'

@Entity('t_product')
export class Product {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '商品id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '商品名称',
  })
  product_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '商品描述',
  })
  product_desc: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '商品类别',
  })
  product_category: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '商品价格',
  })
  product_price: number;

  // 一对一关系，表示一个产品对应一个注册信息
  @OneToOne(() => Register, (register) => register.product)
  @JoinColumn() // 表示这个实体将存储关联的外键
  register: Register;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}