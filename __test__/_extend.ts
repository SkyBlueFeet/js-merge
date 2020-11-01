import { extend } from '../lib/extend'
import { merge } from '../lib/merge'

const tart = {
  b: 7,
  c: {
    h: 5,
    u: [8]
  }
}

const RES = () => {
  console.log(12306)
}

RES.ReLize = '12306'
RES.prototype.name = 'RES'

for (const key in RES) {
  console.log(key)
}

const result = extend(RES, {
  a: 5,
  c: {
    i: 8,
    u: [10, 8]
  },
  test: tart
})
// result.ReLize
console.log(result)

console.log(
  merge(tart, {
    a: 5,
    c: {
      i: 8,
      u: [10, 8]
    },
    test: tart
  })
)
