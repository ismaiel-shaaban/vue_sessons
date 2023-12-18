import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  // Set a base path if your app is not hosted at the root of the domain
  // base: '/seasons-tour/',

  plugins: [Vue()],

  build: {
    // Set the chunk size warning limit in kilobytes
    chunkSizeWarningLimit: 1000,

    // Configure manual chunks to group specific dependencies together
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: Grouping lodash into a separate chunk
          lodash: ['lodash'],
        },
      },
    },
  },
});
