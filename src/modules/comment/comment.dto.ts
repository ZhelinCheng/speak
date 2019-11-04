/*
 * @Author: ChengZheLin
 * @Date: 2019-11-01 16:59:52
 * @LastEditTime: 2019-11-01 18:02:59
 * @LastEditors: ChengZheLin
 * @Description: DTO
 */

import { Transform, Type } from 'class-transformer'
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  IsIn,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsInt,
  Length,
  Allow
} from 'class-validator'

// 请求DTO
export class CommentQueryDto {
  @IsInt()
  @Min(1)
  @Transform(value => Number(value))
  readonly page: number

  @IsInt()
  @Min(6)
  @Max(20)
  @Transform(value => Number(value))
  readonly limit: number

  @IsString()
  @IsIn(['comment', 'reply'])
  readonly type: string

  @IsString()
  readonly id: string
}

// 评论DTO
export class CommentDto {
  @IsString()
  @MaxLength(15)
  readonly from_nickname: string

  @IsString()
  @MaxLength(255)
  readonly from_avatar: string

  @IsString()
  @MaxLength(68)
  readonly topic_id: string

  @IsString()
  @MaxLength(255)
  readonly content: string

  @IsInt()
  @Max(40000000000)
  @Min(1)
  @Transform(value => Number(value))
  readonly from_uid: number
}
