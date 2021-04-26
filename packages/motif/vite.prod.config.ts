import { defineConfig } from 'vite';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import ts from 'typescript';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';

const libEntryPath = path.resolve(__dirname, 'src/index.ts');
const outputDir = path.resolve(__dirname, 'dist');
const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
const excludeDir = 'node_modules/**';

const urlPlugin = url();

const postCssPlugin = postcss({
  extract: false,
  modules: true,
  minimize: true,
  plugins: [urlPlugin],
}) as Plugin;

const commonJsPlugin = commonjs({
  exclude: excludeDir,
  sourceMap: true,
}) as Plugin;

// @ts-ignore
const svgrPlugin: Plugin = svgr({
  ref: true,
  memo: true,
  svgoConfig: {
    plugins: [
      { removeViewBox: false },
      { removeAttrs: { attrs: 'g:(stroke|fill):((?!^none$).)*' } },
    ],
  },
});

const typescriptPlugin = typescript({
  typescript: ts,
  tsconfig: tsconfigPath,
  clean: true,
}) as Plugin;

const babelPlugin = babel({
  babelHelpers: 'bundled',
  exclude: 'node_modules/**',
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
});

export default defineConfig({
  mode: 'production',
  logLevel: 'info',
  clearScreen: false,
  plugins: [
    commonJsPlugin,
    typescriptPlugin,
    babelPlugin,
    postCssPlugin,
    urlPlugin,
    svgrPlugin,
  ],
  build: {
    outDir: outputDir,
    sourcemap: false,
    minify: 'terser',
    emptyOutDir: true,
    lib: {
      entry: libEntryPath,
      formats: ['es', 'cjs', 'umd'],
      name: 'motif',
    },
    brotliSize: true,
    rollupOptions: {
      treeshake: true,
      external: [excludeDir, 'src/**/*.css'],
      output: {
        exports: 'named',
        freeze: false,
        globals: { react: 'React' },
      },
    },
  },
});

/**
 *     rollupOptions: {
      input: libEntryPath,
      preserveEntrySignatures: 'strict',
      treeshake: true,
      output: [
        {
          dir: 'dist',
          format: 'cjs',
          preserveModules: true,
          manualChunks: {},
        },
      ],
    },
 */
