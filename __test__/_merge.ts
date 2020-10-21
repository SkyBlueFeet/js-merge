/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-10-02 12:17:21
 * @LastEditTime: 2020-10-02 20:25:21
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */
import { mergeWith } from '../lib/merge'

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
  ty: '12306dd',
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

// console.log(merge(Object.create(null), test1, test2))
console.log(
  mergeWith(Object.create(null), [test1, test2], (obj, src) => {
    console.log(obj, src)
    return src
  })
)
// console.log(test1)
