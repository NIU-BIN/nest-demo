import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class TestPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const val = parseInt(value, 16); // 按16进制解析字符串
    if (isNaN(val)) {
      throw new BadRequestException('参数类型错误');
    } else {
      return val;
    }
  }
}