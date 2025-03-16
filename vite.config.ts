import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  if (mode === 'analyze') {
    return {
      plugins: [react(), visualizer()],
      build: {
        rollupOptions: {
          output: {
            entryFileNames: `[name].js`,
            chunkFileNames: `[name].js`,
            assetFileNames: `[name].[ext]`
          }
        }
      }
    }
  }
  return {
    plugins: [react()],
    server: {
      host: '127.0.0.1',
      port: 5173,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            } else if (id.includes('/presenter/components/shared/')) {
              return 'shared-components';
            } else if (id.includes('/presenter/components/common/')) {
              return 'common-components';
            }
          }
        }
      },
      chunkSizeWarningLimit: 300 // Adjust this value as needed
    },
    cacheDir: '.vite-cache'
  };
});