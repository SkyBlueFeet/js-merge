/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-10-02 12:17:21
 * @LastEditTime: 2020-10-02 20:25:21
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */
import { merge, mergeWith } from '../lib/merge'

const test1 = {
  test: 5,
  tap: 'jkkk',
  tys: {
    test1: '12306',
    tysi: [1, 2, 3, 4, 5]
  },
  others: 89
}

const test2 = {
  test: 10,
  tap: 822,
  ty: '12306dd',
  tys: {
    test1: '8792',
    tui: 12306,
    test: [1, 2, 3, 8, 9],
    tysi: [1, 2, 3, 4, 5, 8, 2],
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

try {
  const a1 = merge({}, test1)
  const a2 = merge({}, test1, test2)
  const test = merge({}, ...[test1, test2])
  console.log(test)

  console.log(merge({}, { a: 123, n: 789 }, { ui: 456, a: 852 }))

  const t = mergeWith({}, { a: 8 }, { b: 9 }, (obj) => obj)
  const args = [{}, test1, test2, { a: 8 }, { u: 9 }, (obj, src) => src]
  console.log('58', mergeWith(...args))
  console.log(merge({}))
} catch (error) {
  console.log(error)
}

const ty = (src) => src
const arr1 = [1, 2]

console.log(arr1 === ty(arr1))
