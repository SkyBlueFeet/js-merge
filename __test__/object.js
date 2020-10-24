/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-10-01 00:43:12
 * @LastEditTime: 2020-10-01 00:43:45
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */
console.log(Object.prototype.toString.call({}))

function isPlainObject(val) {
  return val !== null && typeof val === 'object' && Array.isArray(val)
}

const tss = function merge(source, other) {
  if (!isPlainObject(source) || !isPlainObject(other)) {
    return other === undefined ? source : other
  }
  // 合并两个对象的 key，另外要区分数组的初始值为 []
  return Object.keys({
    ...source,
    ...other
  }).reduce(
    (acc, key) => {
      // 递归合并 value
      acc[key] = merge(source[key], other[key])
      return acc
    },
    Array.isArray(source) ? [] : {}
  )
}

const test1 = {
  test: 5,
  tap: 'jkkk',
  tys: {
    test1: '12306',
    tysi: [1, 2, 3, 4, 5]
  }
}

const test2 = {
  test: 10,
  tap: [1, 5, 9],
  yu: '12306',
  tys: {
    test1: '8792',
    tui: 12306,
    test: [1, 2, 3, 8, 9],
    test5: [
      {
        qwer: 123
      },
      {
        qwer: 123
      },
      {
        qwer: 123
      },
      {
        qwer: 123
      }
    ]
  }
}

console.log(tss(test1, test2))

console.log(...undefined)
