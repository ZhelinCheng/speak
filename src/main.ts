/*
 * @Author: ChengZheLin
 * @Date: 2019-10-31 17:05:52
 * @LastEditTime: 2019-11-01 13:22:49
 * @LastEditors: ChengZheLin
 * @Description: 主文件
 */

import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

// const isDev = process.env.NODE_ENV === 'development'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  })
  // 增加前缀
  app.setGlobalPrefix('v1')
  // 获取真实IP
  app.set('trust proxy', 'loopback')
  app.set('x-powered-by', false)
  // 限速
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 30,
      message: {
        code: 429,
        message: '请求过于频繁，请休息一下再试。'
      },
      skip: (req: { ip: string }) => {
        return req.ip.indexOf('127.0.0.1') >= 0
      }
    })
  )
  // 设置 HTTP 头
  app.use(helmet())
  // 开启 CORS
  app.enableCors()

  // 监听
  await app.listen(3070)
}
bootstrap()
