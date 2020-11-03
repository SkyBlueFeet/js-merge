# js-merge

javascript merge and clone utils

## Merge

JS 对象合并函数,源对象中的键值对会被自左至右合并至第一个对象，每个源对象中的普通对象会被递归合并，数组会被拼接在一起，其他类型的值被直接分配。忽略 undefined 值

```js
import { merge } from 'js-merge'
const e1 = merge({}, { a: 2 }, { b: 3 }) //{a:2,b:3}
// 可以输入非常多个对象，就像这样
const args = [{}, { a: 5 }, { b: 10 }, { c: 9 }, ...objs]
const e2 = merge(...args)
```

## MergeWith

类似 Merge，最后一个参数接受一个 customizer，调用以产生目标对象和来源对象属性的合并值。如果 customizer 返回 undefined，将会由合并处理方法代替

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

## Extend

实现了 Assign 的同时，会继承所有来源对象的属性

```js
import { extend } from 'js-merge'
function fun1() {
  console.log('12306')
}

fun1.print(args){
  console.log(args)
}

const source={
  name:'Source'
}

const target=extend({},fun1);

target.print('extend') // extend
target.name // Source
```

## ExtendWith

类似于 Extend,接受一个 customizer 决定如何继承对象或函数

JS 对象

## Assign

分配 source 对象的可枚举属性到 target 目标对象上。 source 对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。此操作为浅拷贝

```js
import { assign } from 'js-merge'
const target = {}

assign(target, { a: 5 }, { b: 9 }) //target={a:'5',b:'9'}
```

## AssignWith

类似于 Assign,同时接受一个 customizer 决定如何分配值

```js
import { assignWith } from 'js-merge'
const target = {}
function customize(obj, src) {
  if (typeof src === 'number') {
    return src.toString()
  }
  return src
}
assignWith(target, { a: 5 }, { b: 9 }) //target={a:'5',b:'9'}
```
