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
    await getRepositoryFactory(Comment)
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
    const { page, limit, type, id } = query
    let select = ['content']
    if (type === 'comment') {
      select = select.concat([
        'id', 'content', 'from_uid', 'created_at', 'like_count',
        'from_avatar', 'from_nickname'
      ])
    } else {
      select = select.concat([
        'id', 'comment_id', 'reply_id', 'content', 'from_uid',
        'to_uid', 'reply_type', 'created_at', 'like_count',
        'from_avatar', 'from_nickname'
      ])
    }
    select = select.map(item => {
      return 'rep.' + item
    })
    const res = getRepositoryFactory(Comment)
      .select(select)
      .where('rep.topic_id = :id', { id })
      .andWhere('rep.status = :status', { status: 'normal' })
      .skip((page - 1) * limit)
      .take(limit)
    return {
      page,
      count: await res.getCount(),
      list: await res.getMany()
    }
  }
}
