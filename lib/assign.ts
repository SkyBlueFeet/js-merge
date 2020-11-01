import { isPlainObject } from './assert'
import { objectIterator } from './public'

type Plain = Record<string | symbol | number, any>

type Customize = (objValue: unknown, src: unknown) => unknown

function basicAssign(target: Plain, source: Plain, customize: Customize) {
  objectIterator(source, (key: string, val: unknown) => {
    if (target === val) return

    if (typeof customize === 'function') {
      target[key] = customize(target[key], val)
      return
    }

    if (isPlainObject(val)) {
      if (!target[key]) target[key] = {}
      basicAssign(target[key], val, customize)
    } else {
      target[key] = val
    }
  })

  return target
}

export interface Assign {
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
  <T, S extends Plain>(target: T, ...sources: S[]): T & S & Plain
  <T extends Plain>(...targets: T[]): T & Plain
}

export const assign: Assign = function (target: Plain, ...sources: Plain[]) {
  for (const source of sources) {
    basicAssign(target, source, undefined)
  }
  return target
}

interface AssignWith {
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

export const assignWith: AssignWith = function (...args: any[]) {
  const target = args.shift()
  const customize = args.pop()

  for (const source of args) {
    basicAssign(target, source, customize)
  }

  return target
}
