import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // 🔥 Ini penting untuk mencegah error 404 saat refresh halaman seperti /cart
    fs: {
      allow: ['..']
    },
    historyApiFallback: true
  }
})
