import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

/** @typedef {import('rollup').RollupOptions} RollupOptions */
/** @typedef {import('rollup').OutputOptions} OutputOptions */

const fileName = 'index';

/**
 * @param options {RollupOptions}
 * @returns {RollupOptions}
 */
function bundle(options) {
  return {
    ...options,
    input: `./src/${fileName}.ts`,
    external: ['thror']
  }
}

export default [
  bundle({
    plugins: [esbuild(), terser()],
    output: [
      {
        file: `./dist/cjs/${fileName}.cjs`,
        format: 'cjs',
        exports: 'named',
        sourcemap: true
      },
      {
        file: `./dist/esm/${fileName}.mjs`,
        format: 'es',
        exports: 'named',
        sourcemap: true
      }
    ]
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `./dist/types/${fileName}.d.ts`,
      format: 'es'
    }
  })
];