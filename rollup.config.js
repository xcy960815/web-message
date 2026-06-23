const fs = require('fs')
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

fs.rmSync(distDir, { recursive: true, force: true })
fs.rmSync(typesDir, { recursive: true, force: true })
fs.mkdirSync(distDir, { recursive: true })
fs.mkdirSync(typesDir, { recursive: true })

module.exports = [
  {
    input,
    external: ['vue'],
    output: [
      {
        file: path.join(distDir, 'web-message.es.js'),
        format: 'es',
      },
      {
        file: path.join(distDir, 'web-message.umd.js'),
        format: 'umd',
        name: 'WebMessage',
        globals: {
          vue: 'Vue',
        },
      },
      {
        file: path.join(distDir, 'web-message.umd.min.js'),
        format: 'umd',
        name: 'WebMessage',
        globals: {
          vue: 'Vue',
        },
        plugins: [terser()],
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
