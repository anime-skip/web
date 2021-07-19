import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), visualizer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         vue: ['node_modules/vue/index.js'],
  //         'vue-router': ['node_modules/vue-router/dist/vue-router.esm-bundler.js'],
  //         'anime-skip-ui': [
  //           'node_modules/@anime-skip/ui/ui.es.js',
  //           'node_modules/@anime-skip/ui/tailwind.css',
  //         ],
  //         axios: ['node_modules/axios/index.js', 'node_modules/@anime-skip/axios-api/lib/index.js'],
  //       },
  //     },
  //   },
  // },
});
