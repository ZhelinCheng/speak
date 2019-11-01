/*
 * @Author: ChengZheLin
 * @Date: 2019-11-01 17:18:05
 * @LastEditTime: 2019-11-01 17:18:23
 * @LastEditors: ChengZheLin
 * @Description: 异常过滤器
 */

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { HttpException } from '@nestjs/common'

@Catch()
export default class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const isHttp = exception instanceof HttpException
    const status = isHttp ? exception.getStatus() : 500
    const message = exception.message

    if (status >= 500) {
      // tslint:disable-next-line: no-console
      console.error(message)
    }

    response.status(status).json({
      code: status,
      message:
        status >= 500
          ? '服务器错误'
          : typeof message === 'object'
          ? message.error
          : message,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}
