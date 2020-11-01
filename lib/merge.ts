/* eslint-disable no-redeclare */
/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-09-30 23:09:40
 * @LastEditTime: 2020-10-02 20:26:10
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */

import { isArray, isFunction, isPlainObject } from './assert'
import { objectIterator } from './public'

type Plain = Record<string | symbol | number, any>

type Assign<T, S> = T & S & Plain

type Customize = (objValue: unknown, src: unknown) => unknown

function basicMerge(target: Plain, source: Plain, customize: Customize) {
  objectIterator(source, (key: string, val: unknown) => {
    if (target === source[key]) return

    if (typeof customize === 'function') {
      target[key] = customize(target[key], val)
      return
    }

    if (isPlainObject(val) || isArray(val)) {
      if (!target[key]) target[key] = isArray(val) ? [] : {}
      basicMerge(target[key], val, customize)
    } else {
      target[key] = val
    }
  })

  return target
}

interface mergeWith {
  <T, A>(target: T, source: A, customize: Customize): T & A
  <T, A, B>(target: T, source: A, sourceB: B, customize: Customize): T & A & B
  <T, A, B, C>(
    target: T,
    source: A,
    sourceB: B,
    sourceC: C,
    customize: Customize
  ): T & A & B & C
  <T, A, B, C, D>(
    target: T,
    source: A,
    sourceB: B,
    sourceC: C,
    sourceD: D,
    customize: Customize
  ): T & A & B & C & D
  <T, A, B, C, D, E>(
    target: T,
    source: A,
    sourceB: B,
    sourceC: C,
    sourceD: D,
    sourceE: E,
    customize: Customize
  ): T & A & B & C & D & E
  <T, A, B, C, D, E, F>(
    target: T,
    source: A,
    sourceB: B,
    sourceC: C,
    sourceD: D,
    sourceE: E,
    sourceF: F,
    customize: Customize
  ): T & A & B & C & D & E & F
  <T, A, B, C, D, E, F, G>(
    target: T,
    source: A,
    sourceB: B,
    sourceC: C,
    sourceD: D,
    sourceE: E,
    sourceF: F,
    sourceG: G,
    customize: Customize
  ): T & A & B & C & D & E & F & G
  (...args: any[]): Plain
}

/**
 * @description JS对象合并方法，可以使用自定义方法过滤数据
 * @param {Object} target 需要合并的目标对象，作为第一个参数
 * @param {Object} source 需要合并的源对象
 * @param {Customize} customize 自定义函数,作为最后一个参数
 * @example
 * const customize= function(obj,src){
 *    let val;
 *    //...operate
 *    return val;
 * }
 * const e1=mergeWith({},{a:2},{b:3},customize) //{a:2,b:3}
 * // 你可以输入非常多个对象，就像这样
 * const args= [{},{a:5},{b:10},{c:9},...objs,customize];
 * const e2=mergeWith(...args)
 */
export const mergeWith: mergeWith = function _mergeWith(...args: any[]): Plain {
  const customize = args.pop()
  const target = args.shift()

  if (!isFunction(customize)) {
    throw new Error('请在最后一位参数输入处理函数')
  }

  if (!args.length) return target

  const source = args.shift()

  if (isPlainObject(target) && isPlainObject(source)) {
    basicMerge(target, source, customize)
  }

  args.push(customize)
  return target
}

export interface Merge {
  <T, A>(target: T, source: A): T & A
  <T, A, B>(target: T, source: A, sourceB: B): T & A & B
  <T, A, B, C>(target: T, source: A, sourceB: B, sourceC: C): T & A & B & C
  <T, A, B, C, D>(target: T, source: A, sourceB: B, sourceC: C, sourceD: D): T &
    A &
    B &
    C &
    D
  <T, A, B, C, D, E>(
    target: T,
    source: A,
    sourceB: B,
    sourceC: C,
    sourceD: D,
    sourceE: E
  ): T & A & B & C & D & E
  <T, A, B, C, D, E, F>(
    target: T,
    source: A,
    sourceB: B,
    sourceC: C,
    sourceD: D,
    sourceE: E,
    sourceF: F
  ): T & A & B & C & D & E & F
  <T, A, B, C, D, E, F, G>(
    target: T,
    source: A,
    sourceB: B,
    sourceC: C,
    sourceD: D,
    sourceE: E,
    sourceF: F,
    sourceG: G
  ): T & A & B & C & D & E & F & G
  <T, S extends Plain>(target: T, ...sources: S[]): Assign<T, S>
  <T extends Plain>(...targets: T[]): T & Plain
}

/**
 * @description JS对象合并,参数数量不限
 * @param {Object} target 需要合并的目标对象
 * @param {...Object} sources 需要合并的源对象
 * @example
 * const e1=mergeWith({},{a:2},{b:3},...objs) //{a:2,b:3,...}
 */
export const merge: Merge = function _merge(
  target: Plain,
  ...sources: Plain[]
): Plain {
  for (const source of sources) {
    basicMerge(target, source, undefined)
  }

  return target
}

// type Sources<T> = T[]
// // [string, string, ...Array<number | boolean>]
// type Unbounded<T> = [unknown, ...Sources<T>, Function]

// export const merge: Merge = _merge
// export const mergeWith = _mergeWith
