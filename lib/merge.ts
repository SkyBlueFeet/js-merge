/* eslint-disable no-redeclare */
/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-09-30 23:09:40
 * @LastEditTime: 2020-10-02 20:26:10
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */

import {
  isArray,
  isFunction,
  isNull,
  isPlainObject,
  isUndefined
} from './assert'
import { objectIterator } from './public'

type Plain = Record<string | symbol | number, any>

type Assign<T, S> = T & S & Plain

type Customize = (objValue: unknown, src: unknown) => unknown

function mergeObjects(...args: any[]): any {
  const customize = args.pop()
  const target = args.shift()

  if (!isFunction(customize)) {
    throw new Error('请在最后一位参数输入处理函数')
  }

  if (!args.length) return target

  const source = args.shift()

  if (isPlainObject(target) && isPlainObject(source)) {
    objectIterator(source, (key: string, val: unknown) => {
      if (isPlainObject(val)) {
        if (!target[key]) target[key] = {}
        mergeObjects(target[key], val, customize)
      } else if (isArray(val) && isArray(target[key])) {
        const result = customize(target[key], val)

        target[key] = val === result ? [...(target[key] as []), ...val] : result
      } else {
        target[key] = customize(target[key], val)
      }
    })
  }

  args.push(customize)
  return mergeObjects(target, ...args)
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
function _mergeWith<T, A>(target: T, source: A, customize: Customize): T & A
function _mergeWith<T, A, B>(
  target: T,
  source: A,
  sourceB: B,
  customize: Customize
): T & A & B
function _mergeWith<T, A, B, C>(
  target: T,
  source: A,
  sourceB: B,
  sourceC: C,
  customize: Customize
): T & A & B & C
function _mergeWith<T, A, B, C, D>(
  target: T,
  source: A,
  sourceB: B,
  sourceC: C,
  sourceD: D,
  customize: Customize
): T & A & B & C & D
function _mergeWith<T, A, B, C, D, E>(
  target: T,
  source: A,
  sourceB: B,
  sourceC: C,
  sourceD: D,
  sourceE: E,
  customize: Customize
): T & A & B & C & D & E
function _mergeWith<T, A, B, C, D, E, F>(
  target: T,
  source: A,
  sourceB: B,
  sourceC: C,
  sourceD: D,
  sourceE: E,
  sourceF: F,
  customize: Customize
): T & A & B & C & D & E & F
function _mergeWith<T, A, B, C, D, E, F, G>(
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
function _mergeWith(...args: Plain[]): Plain
function _mergeWith(...args: Plain[]): Plain {
  return mergeObjects(...args)
}

/**
 * @description JS对象合并,参数数量不限
 * @param {Object} target 需要合并的目标对象
 * @param {...Object} source 需要合并的源对象
 * @example
 * const e1=mergeWith({},{a:2},{b:3},...objs) //{a:2,b:3,...}
 */
function _merge<T, A>(target: T, source: A): T & A
function _merge<T, A, B>(target: T, sourceA: A, sourceB: B): T & A & B
function _merge<T, A, B, C>(
  target: T,
  sourceA: A,
  sourceB: B,
  sourceC: C
): T & A & B & C
function _merge<T, A, B, C, D>(
  target: T,
  sourceA: A,
  sourceB: B,
  sourceC: C,
  sourceD: D
): T & A & B & C & D
function _merge<T, A, B, C, D, E>(
  target: T,
  sourceA: A,
  sourceB: B,
  sourceC: C,
  sourceD: D,
  sourceE: E
): T & A & B & C & D & E
function _merge<T, A, B, C, D, E, F>(
  target: T,
  sourceA: A,
  sourceB: B,
  sourceC: C,
  sourceD: D,
  sourceE: E,
  sourceF: F
): T & A & B & C & D & E & F
function _merge<T, A, B, C, D, E, F, G>(
  target: T,
  sourceA: A,
  sourceB: B,
  sourceC: C,
  sourceD: D,
  sourceE: E,
  sourceF: F,
  sourceG: G
): T & A & B & C & D & E & F & G
// function _merge<T>(target: T, ...sources: Plain[]): Assign<T, Plain>
function _merge<T, S extends Plain>(target: T, ...sources: S[]): Assign<T, S>
function _merge<T, S>(target: T, ...sources: S[]): Assign<T, S> {
  const args: any[] = sources
  const customize = (_obj: any, srcval: any) => srcval
  args.push(customize)

  return mergeObjects(target, ...args)
}

// type Sources<T> = T[]
// // [string, string, ...Array<number | boolean>]
// type Unbounded<T> = [unknown, ...Sources<T>, Function]

export const merge = _merge
export const mergeWith = _mergeWith
