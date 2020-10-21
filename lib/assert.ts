/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-10-01 00:13:03
 * @LastEditTime: 2020-10-02 13:52:19
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */
export const isArray = <T>(val: unknown): val is T[] =>
  Object.prototype.toString.call(val) === '[object Array]'

export const isPlainObject = (val: unknown): val is Record<string, unknown> =>
  Object.prototype.toString.call(val) === '[object Object]'

export const isUndefined = (val: unknown): val is undefined =>
  typeof val === 'undefined'

export const isNull = (val: unknown): val is null =>
  Object.prototype.toString.call(val) === '[object Null]'

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const isBoolean = (val: unknown): val is boolean =>
  typeof val === 'boolean'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
