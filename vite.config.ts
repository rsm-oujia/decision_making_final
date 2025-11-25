import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ⚠️ 在 StackBlitz 里不要用 path.resolve，直接用 '/src'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
