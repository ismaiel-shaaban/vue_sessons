import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  // Set a base path if your app is not hosted at the root of the domain
  // base: '/seasons-tour/',

  plugins: [Vue()],

});
