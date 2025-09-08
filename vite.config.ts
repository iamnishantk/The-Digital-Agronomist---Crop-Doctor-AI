import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [vue()],
    base: '/The-Digital-Agronomist---Crop-Doctor-AI/',
    // You can add more options here
  };
});
