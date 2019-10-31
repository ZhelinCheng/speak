/*
 * @Author: ChengZheLin
 * @Date: 2019-10-31 17:43:35
 * @LastEditTime: 2019-10-31 17:47:39
 * @LastEditors: ChengZheLin
 * @Description: test
 */
import { ValidationPipe } from './app.pipe'

describe('AppPipe', () => {
  it('should be defined', () => {
    expect(new ValidationPipe()).toBeDefined()
  })
})
