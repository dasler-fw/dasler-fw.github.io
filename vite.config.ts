import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/dasler-fw.github.io',
  plugins: [react()],
})
