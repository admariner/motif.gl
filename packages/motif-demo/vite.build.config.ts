import { defineConfig } from 'vite';

export default defineConfig({
  mode: 'production',
  build: {
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
      keep_fnames: true,
    },
  },
  optimizeDeps: {
    keepNames: true,
  },
});
