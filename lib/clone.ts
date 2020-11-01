import { isArray, isBoolean, isPlainObject } from './assert'

function basicClone<T>(isDeep: boolean, target: object, source: T): T {
  for (const key of Object.keys(source)) {
    const srcVal = source[key]
    if (isDeep && (isPlainObject(srcVal) || isArray(srcVal))) {
      target[key] = isArray(srcVal) ? [] : {}
      target[key] = basicClone(isDeep, target, srcVal)
    } else {
      target[key] = srcVal
    }
  }

  return target as any
}

interface Clone {
  <T>(isDeep: boolean, source: T): T
  <T>(source: T): T
}

export const clone: Clone = function () {
  const isDeep = isBoolean(arguments[0]) ? arguments[0] : true
  const source = isBoolean(arguments[0]) ? arguments[1] : arguments[0]
  if (!isPlainObject(source) && !isArray(source)) return source
  return basicClone(isDeep, {}, source)
}
