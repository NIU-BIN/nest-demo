import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity('t_account')
export class Account {
  @PrimaryGeneratedColumn('uuid', {
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

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    comment: '开户时间',
  })
  createdAt: Date;

  @OneToMany(() => Order, (order) => order.account)
  orders: Order[];
}