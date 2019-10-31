/*
 * @Author: ChengZheLin
 * @Date: 2019-10-31 17:05:52
 * @LastEditTime: 2019-10-31 17:48:23
 * @LastEditors: ChengZheLin
 * @Description: App模块
 */
import { Module, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MorganMiddleware } from '@nest-middlewares/morgan'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AppInterceptor } from './app.interceptor'
import { ValidationPipe } from './app.pipe'
const isDev = process.env.NODE_ENV === 'development'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor
    }
  ]
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure(isDev ? 'dev' : 'combined')
    consumer.apply(MorganMiddleware).forRoutes('*')
  }
}
