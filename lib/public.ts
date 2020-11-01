/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-10-01 17:15:17
 * @LastEditTime: 2020-10-02 14:14:27
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */
export const objectIterator = (
  obj: Record<string | symbol, unknown>,
  callback: (key: string, val: unknown) => void
) => Object.entries(obj).map((vals) => callback(vals[0], vals[1]))
