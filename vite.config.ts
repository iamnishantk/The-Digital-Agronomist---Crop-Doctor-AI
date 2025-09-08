import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
 
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    plugins: [vue()],
   base:'/The-Digital-Agronomist---Crop-Doctor-AI/',
});
