/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-09-30 23:19:47
 * @LastEditTime: 2020-10-01 00:07:18
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */
import typescriptPlugin from '@rollup/plugin-typescript';
import babelPlugin from '@rollup/plugin-babel';
import Uglify from '@yuloh/rollup-plugin-uglify';

export default {
  input: 'lib/index.ts',
  output: [{
    file: 'dist/merge.cjs.js',
    format: 'cjs',
  }, {
    file: 'dist/merge.esm.js',
    format: 'esm',
  }, {
    file: 'dist/merge.iife.js',
    format: 'iife',
  }],
  plugins: [
    typescriptPlugin(),
    babelPlugin({
      babelHelpers: 'bundled',
    }),
    Uglify(),
  ],
};
