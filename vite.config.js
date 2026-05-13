import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'src/actions'),
      analytics: path.resolve(__dirname, 'src/analytics'),
      appReducer: path.resolve(__dirname, 'src/appReducer'),
      components: path.resolve(__dirname, 'src/components'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      images: path.resolve(__dirname, 'src/images'),
      requests: path.resolve(__dirname, 'src/requests'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, 'src')],
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div'],
      },
    },
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: true,
  },
});
