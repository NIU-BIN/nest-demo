import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('d_user')
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '用户id',
  })
  id: number;

  @Column({
    type: 'varchar',
    comment: '用户昵称',
  })
  username: string;

  @Column({
    type: 'varchar',
    comment: '密码',
    select: false,
  })
  password: string;

  @Column({
    type: 'datetime',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
}