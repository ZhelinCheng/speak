/*
 * @Author: ChengZheLin
 * @Date: 2019-10-31 17:13:34
 * @LastEditTime: 2019-11-01 10:49:45
 * @LastEditors: ChengZheLin
 * @Description: 数据库配置
 */

const conf = require(`./config.${process.env.NODE_ENV}`)
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    ...conf,
    "entityPrefix": 'sp_',
    "entities": ['dist/**/*.entity{.ts,.js}'],
    "synchronize": isDev,
    "logging": isDev,
    "maxQueryExecutionTime": 400
}