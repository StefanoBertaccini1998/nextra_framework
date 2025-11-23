import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    // Tailwind integration for Vite (plugin approach)
    tailwindcss(),
    dts({
      tsconfigPath: path.resolve(__dirname, 'tsconfig.build.json'),
      insertTypesEntry: true,
      include: ['src'],
      outDir: 'dist',
      rollupTypes: true,
      copyDtsFiles: true
    }),
  ],
  resolve: {
    alias: {
      // During dev, resolve the local ui-lib source instead of the package dist
      '@nextra/ui-lib': path.resolve(__dirname, '../nextra-ui-lib/src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'nextra-ui',
      fileName: (format) => `nextra-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
})
