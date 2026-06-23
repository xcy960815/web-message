const path = require('path')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const typescript = require('@rollup/plugin-typescript')
const { dts } = require('rollup-plugin-dts')
const terser = require('@rollup/plugin-terser')

const input = path.resolve(__dirname, 'src/index.ts')
const distDir = path.resolve(__dirname, 'dist')
const typesDir = path.resolve(__dirname, 'types')

module.exports = [
  {
    input,
    external: ['vue'],
    output: [
      {
        file: path.join(distDir, 'web-message.es.js'),
        format: 'es',
        sourcemap: true,
      },
      {
        file: path.join(distDir, 'web-message.common.js'),
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: path.join(distDir, 'web-message.umd.js'),
        format: 'umd',
        name: 'WebMessage',
        globals: {
          vue: 'Vue',
        },
        sourcemap: true,
      },
      {
        file: path.join(distDir, 'web-message.umd.min.js'),
        format: 'umd',
        name: 'WebMessage',
        globals: {
          vue: 'Vue',
        },
        plugins: [terser()],
        sourcemap: true,
      },
    ],
    plugins: [
      resolve.nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      postcss({
        extract: path.join(distDir, 'web-message.css'),
        minimize: true,
      }),
      typescript({
        tsconfig: './tsconfig.rollup.json',
      }),
    ],
  },
  {
    input,
    output: [
      {
        file: path.join(typesDir, 'web-message.d.ts'),
        format: 'es',
      },
    ],
    external: [/\.css$/, 'vue'],
    plugins: [
      dts({
        tsconfig: './tsconfig.rollup.json',
      }),
    ],
  },
]
