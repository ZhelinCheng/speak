/*
 * @Author: ChengZheLin
 * @Date: 2019-11-01 10:57:09
 * @LastEditTime: 2019-11-01 13:11:13
 * @LastEditors: ChengZheLin
 * @Description: 主评论表
 */
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import BaseEntity from './base.entity'
@Entity('comment')
export class Comment extends BaseEntity {
    @Index()
    @Column({
        length: 68,
        comment: '主题ID'
    })
    topic_id: string

    @Column({
        default: '',
        comment: '主题类型'
    })
    topic_type: string

    @Column({
        default: '',
        comment: '评论内容'
    })
    content: string

    @Column({
        unsigned: true,
        comment: '评论用户id'
    })
    from_uid: number
}
