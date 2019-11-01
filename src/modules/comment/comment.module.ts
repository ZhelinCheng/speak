/*
 * @Author: ChengZheLin
 * @Date: 2019-11-01 16:43:42
 * @LastEditTime: 2019-11-01 16:44:00
 * @LastEditors: ChengZheLin
 * @Description:
 */
import { Module } from '@nestjs/common'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'

@Module({
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
