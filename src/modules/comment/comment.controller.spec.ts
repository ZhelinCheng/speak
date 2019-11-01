/*
 * @Author: ChengZheLin
 * @Date: 2019-11-01 16:44:48
 * @LastEditTime: 2019-11-01 18:33:06
 * @LastEditors: ChengZheLin
 * @Description: 测试
 */
import { Test, TestingModule } from '@nestjs/testing'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'

describe('Comment Controller', () => {
  let controller: CommentController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentService]
    }).compile()

    controller = module.get<CommentController>(CommentController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
