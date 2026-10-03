import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // Клиентская сборка очищает dist. SSR-сборка пишет только в dist/server
    // и не должна стирать уже собранные статические файлы.
    emptyOutDir: !isSsrBuild,
    copyPublicDir: !isSsrBuild,
  },
  ssr: {
    noExternal: [
      'motion',
      'framer-motion',
      'motion-dom',
      'motion-utils',
      '@phosphor-icons/react',
    ],
  },
}))
