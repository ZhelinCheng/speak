/*
 * @Author: ChengZheLin
 * @Date: 2019-11-01 16:44:48
 * @LastEditTime: 2019-11-01 18:04:37
 * @LastEditors: ChengZheLin
 * @Description: 评论控制器
 */
import { Controller, Get, Post, Body, Req, Query } from '@nestjs/common'
import { Request } from 'express'
import { CommentService } from './comment.service'
import { plainToClass } from 'class-transformer'
import { CommentDto, CommentQueryDto } from './comment.dto'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 评论
  @Post('topic')
  async commentTopic(@Body() body: CommentDto, @Req() request: Request) {
    body = plainToClass(CommentDto, body)
    const ip = /(\d{1,3}\.?){4}/.exec(request.ip)
    return await this.commentService.commentTopic(body, ip ? ip[0] : '')
  }

  // 获取评论列表
  @Get('list')
  async getCommentList(@Query() query: CommentQueryDto) {
    query = plainToClass(CommentQueryDto, query)
    return this.commentService.getCommentList(query)
  }
}
