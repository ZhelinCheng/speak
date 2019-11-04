/*
 * @Author: ChengZheLin
 * @Date: 2019-10-31 17:05:52
 * @LastEditTime: 2019-11-01 17:13:55
 * @LastEditors: ChengZheLin
 * @Description: App模块
 */
import { Module, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MorganMiddleware } from '@nest-middlewares/morgan'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AppInterceptor } from './app.interceptor'
import { ValidationPipe } from './app.pipe'
// import { AuthService } from './auth/auth.service'
import { CommentModule } from './modules/comment/comment.module'
const isDev = process.env.NODE_ENV === 'development'

@Module({
  imports: [TypeOrmModule.forRoot(), CommentModule],
  controllers: [AppController],
  providers: [
    AppService,
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
