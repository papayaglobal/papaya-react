import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ],
    plugins: [
        external(),
        postcss({
            modules: true
        }),
        url(),
        svgr(),
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs({
            include: [
                'node_modules/**',
                /node_modules\/prop-types/,
            ],
            exclude: [
                'node_modules/process-es6/**',
            ],
            namedExports: {
                'node_modules/react/index.js': [
                    'Children',
                    'PureComponent',
                    'cloneElement',
                    'createContext',
                    'Component',
                    'createElement',
                    'isValidElement',
                ],
                'node_modules/react-dom/index.js': [
                    'findDOMNode',
                    'render',
                    'hydrate',
                    'createPortal'
                ],
                'node_modules/react-is/index.js': [
                    'isElement',
                    'isValidElementType',
                    'ForwardRef'
                ]
            }
        })
    ],
    external: ['react', 'react-dom', 'prop-types', 'styled-components', 'lodash', "moment", "styled-is"],
    context: () => null
}
