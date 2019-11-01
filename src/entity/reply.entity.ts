/*
 * @Author: ChengZheLin
 * @Date: 2019-11-01 11:09:35
 * @LastEditTime: 2019-11-01 13:22:29
 * @LastEditors: ChengZheLin
 * @Description: 回复表
 */
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'
import BaseEntity from './base.entity'
export enum ReplyType {
    COMMENT = 'comment',
    REPLY = 'reply'
}

@Entity('reply')
export class Comment extends BaseEntity {
    @Column({
        unsigned: true,
        comment: '根评论ID'
    })
    comment_id: number

    @Column({
        unsigned: true,
        comment: '回复目标的id，reply_type是0的话，那么reply_id＝comment_id，如果reply_type是1的话，这表示这条回复的父回复'
    })
    reply_id: number

    @Column({
        type: 'enum',
        enum: ReplyType,
        default: ReplyType.COMMENT,
        comment: '回复类型，针对评论的回复(comment)，针对回复的回复（reply）'
    })
    reply_type: ReplyType

    @Column({
        default: '',
        comment: '回复内容'
    })
    content: string

    @Column({
        unsigned: true,
        comment: '评论用户id'
    })
    from_uid: number

    @Column({
        unsigned: true,
        comment: '评论目标用户id'
    })
    to_uid: number
}
