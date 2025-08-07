import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity('t_account')
export class Account {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '账户id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '账户名称',
  })
  account_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '账户描述',
  })
  account_desc: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '账户类别',
  })
  account_category: string;

  @OneToMany(() => Order, (order) => order.account)
  orders: Order[];
}