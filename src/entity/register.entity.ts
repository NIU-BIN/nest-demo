import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Product } from './product.entity'

@Entity('t_register')
export class Register {
  @PrimaryGeneratedColumn('uuid', {
    comment: '注册信息id',
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '注册信息名称',
  })
  register_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '注册信息描述',
  })
  register_desc: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '注册信息类别',
  })
  register_category: string;

  // 一对一关系，表示一个注册信息对应一个产品
  @OneToOne(() => Product, (product) => product.register)
  product: Product;
}