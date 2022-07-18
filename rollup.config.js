import typescript from 'rollup-plugin-typescript2'
import {
    terser
} from 'rollup-plugin-terser'
import autoprefixer from "autoprefixer"
import postcss from 'rollup-plugin-postcss'
import {
    nodeResolve
} from '@rollup/plugin-node-resolve' //将外部引入的js打包进来
import babel from '@rollup/plugin-babel'
import del from 'rollup-plugin-delete' //
import commonjs from '@rollup/plugin-commonjs' //将CommonJS模块转换为ES6, 方便rollup直接调用
import livereload from 'rollup-plugin-livereload'

const isProduction = process.env.NODE_ENV === 'production'

export default {
    input: './src/web-message.ts',
    output: [{
            format: 'umd',
            file: 'dist/web-message.umd.js',
            name: 'WebMessage',
        },
        {
            format: 'es',
            file: 'dist/web-message.esm.js',
        },
    ],
    plugins: [
        isProduction && terser(),
        isProduction && del({
            targets: ['dist']
        }),
        nodeResolve(),

        commonjs({
            include: 'node_modules/**',
        }),

        postcss({
            plugins: [autoprefixer()],
        }),

        babel({
            exclude: 'node_modules/**',
            babelHelpers: "runtime"
        }),
        // 热更新
        !isProduction && livereload("./src"),
        typescript({
            exclude: 'node_modules/**',
            useTsconfigDeclarationDir: true,
            extensions: ['.js', '.ts', '.tsx'],
        }),
    ],
}