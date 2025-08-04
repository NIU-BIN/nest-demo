// src/users/dto/create-user.dto.ts
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  // 姓名：必须是字符串，长度 2-20
  @IsNotEmpty({ message: '姓名不能为空' })
  @IsString({ message: '姓名必须是字符串' })
  @MinLength(2, { message: '姓名至少 2 个字符' })
  @MaxLength(20, { message: '姓名最多 20 个字符' })
  readonly name: string;

  // 邮箱：必须符合邮箱格式
  @IsNotEmpty({ message: '邮箱地址不能为空' })
  @IsEmail({}, { message: '请输入合法的邮箱地址' })
  readonly email: string;

  // 密码：至少 6 位，包含字母和数字
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码至少 6 位' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
    message: '密码必须包含字母和数字',
  })
  readonly password: string;
}
