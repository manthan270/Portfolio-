import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDirectory = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const plugins = [tailwindcss(), react()];

  // Keep bundle analysis out of routine production builds.
  if (mode === 'analyze') {
    plugins.push(visualizer({
      filename: 'stats-optimized.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }));
  }

  return {
    plugins,
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['motion/react'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(projectDirectory, 'src'),
      },
    },
  };
});
