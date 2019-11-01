/*
 * @Author: ChengZheLin
 * @Date: 2019-11-01 11:20:46
 * @LastEditTime: 2019-11-01 13:21:37
 * @LastEditors: ChengZheLin
 * @Description: 基础结构
 */

import { Column, Index, PrimaryGeneratedColumn } from 'typeorm'
export enum StatusType {
  NORMAL = 'normal',
  DELETE = 'delete',
  SHIELD = 'shield'
}

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({
    type: 'int',
    comment: '创建时间',
    unsigned: true,
    width: 11
  })
  created_at: number

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.NORMAL,
    comment: '评论回复状态'
  })
  status: StatusType

  @Column({
    length: 15,
    comment: '用户昵称'
  })
  from_nickname: string

  @Column({
    default: '',
    comment: '用户头像'
  })
  from_avatar: string

  @Column({
    default: '',
    length: 15,
    comment: '用户IP'
  })
  ip: string

  @Column({
    default: 0,
    width: 6,
    unsigned: true,
    comment: '点赞数'
  })
  like_count: number
}
