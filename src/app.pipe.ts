/*
 * @Author: ChengZheLin
 * @Date: 2019-10-31 17:43:35
 * @LastEditTime: 2019-10-31 17:44:30
 * @LastEditors: ChengZheLin
 * @Description: 全局管道，用于参数转换
 */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata

    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed', '参数非法')
    }
    return value
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }
}
