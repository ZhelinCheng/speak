/*
 * @Author: ChengZheLin
 * @Date: 2019-10-31 17:37:28
 * @LastEditTime: 2019-10-31 17:38:29
 * @LastEditors: ChengZheLin
 * @Description: 全局数据拦截器
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  code: number
  message: string
  data: T
}

@Injectable()
export class AppInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        code: 200,
        message: 'success',
        data
      }))
    )
  }
}
