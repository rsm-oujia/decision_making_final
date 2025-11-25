import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/decision_making_final/',   // 仓库名
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
