/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-09-30 23:09:40
 * @LastEditTime: 2020-10-02 20:26:10
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */

import { isArray, isNull, isPlainObject, isUndefined } from './assert'
import { objectIterator } from './public'

export const merge = function _merge(target: unknown, ...sources: unknown[]) {
  if (!sources.length) return target
  const source = sources.shift()
  if (isPlainObject(target) && isPlainObject(source)) {
    objectIterator(source, (key: string, val: unknown) => {
      if (isPlainObject(val)) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        _merge(target[key], val)
      } else if (!isUndefined(val) && !isNull(val)) {
        Object.assign(target, { [key]: val })
      }
    })
  }
  return _merge(target, ...sources)
}

export const mergeWith = function _merge(
  target: unknown,
  sources: unknown[] | unknown,
  customize = (obj: unknown, src: unknown) => src
) {
  const objs = isArray(sources) ? sources : [sources]

  if (!objs.length) return target

  const obj = objs.shift()

  if (isPlainObject(target) && isPlainObject(obj)) {
    objectIterator(obj, (key: string, val: unknown) => {
      if (isPlainObject(val)) {
        if (!target[key]) target[key] = {}
        _merge(target[key], [val], customize)
      } else if (!isUndefined(val) && !isNull(val)) {
        target[key] = customize(target[key], val)
      }
    })
  }
  return _merge(target, objs, customize)
}
