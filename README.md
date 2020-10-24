# js-merge

javascript merge and clone utils

## Merge

JS 对象合并函数

```js
import { merge } from 'js-merge'
const e1 = merge({}, { a: 2 }, { b: 3 }) //{a:2,b:3}
// 可以输入非常多个对象，就像这样
const args = [{}, { a: 5 }, { b: 10 }, { c: 9 }, ...objs]
const e2 = merge(...args)
```

## MergeWith

JS 对象合并函数，支持定义值

```js
import { mergeWith } from 'js-merge'
const customize = function (obj, src) {
  let val
  //...operate
  return val
}
const e1 = mergeWith({}, { a: 2 }, { b: 3 }, customize) //{a:2,b:3}
// 在最后输入定义函数
const args = [{}, { a: 5 }, { b: 10 }, { c: 9 }, ...objs, customize]
const e2 = mergeWith(...args)
```
