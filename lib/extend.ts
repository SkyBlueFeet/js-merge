import { isFunction, isPlainObject } from './assert'
type Customize = (objValue: unknown, src: unknown) => unknown

function BasicExtend(target: any, source: any, customizer: Customize): any {
  if (!isPlainObject(target) && !isFunction(target)) target = {}

  if (!source) return target

  for (const srcKey in source) {
    // if (target === source[srcKey]) continue

    target[srcKey] = isFunction(customizer)
      ? customizer(target[srcKey], source[srcKey])
      : source[srcKey]
  }

  return target
}

interface Extend {
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
  <T, S>(target: T, ...sources: S[]): T &
    S &
    Record<string | symbol | number, any>
}

export const extend: Extend = function (target: any, ...sources: any[]) {
  if (sources.length === 0) return target

  for (const source of sources) {
    BasicExtend(target, source, undefined)
  }
  return target
}

interface ExtendWith {
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
  (...args: any[]): Record<string | symbol | number, any>
}

export const extendWith: ExtendWith = function extendWith(...args: any[]) {
  const target = args.shift()
  const customizer = args.pop()
  if (args.length === 0) return target

  for (const source of args) {
    BasicExtend(target, source, customizer)
  }
  return target
}
