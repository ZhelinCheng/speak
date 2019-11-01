/*
 * @Author: ChengZheLin
 * @Date: 2019-11-01 16:45:03
 * @LastEditTime: 2019-11-01 18:04:49
 * @LastEditors: ChengZheLin
 * @Description: 评论服务
 */
import { Injectable } from '@nestjs/common'
import { ObjectType, SelectQueryBuilder, getRepository } from 'typeorm'
import { CommentDto } from './comment.dto'

import { Comment } from '../../entity'

function getRepositoryFactory<Entity>(
  entityClass: ObjectType<Entity>,
  alias: string = 'rep'
): SelectQueryBuilder<Entity> {
  const rep = getRepository(entityClass).createQueryBuilder(alias)
  return rep
}

@Injectable()
export class CommentService {
  private getDate(): number {
    return Math.floor(Date.now() / 1000)
  }

  // 评论主题
  async commentTopic(body: CommentDto, ip: string = ''): Promise<boolean> {
    const res = await getRepositoryFactory(Comment)
      .insert()
      .values({
        created_at: this.getDate(),
        ip,
        ...body
      })
      .execute()
    return true
  }

  async getCommentList(query): Promise<any> {
    return query
  }
}
