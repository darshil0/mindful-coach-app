import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', 'VITE_');
  
  return {
    plugins: [react(), tailwindcss()],
    
    define: {
      // Use import.meta.env.VITE_GEMINI_API_KEY in the app instead of process.env
      // This ensures proper client-side access
      __DEV__: mode === 'development',
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      port: 3000,
      host: '0.0.0.0',
      
      // HMR disabled in AI Studio to prevent flickering during agent edits
      hmr: process.env.DISABLE_HMR !== 'true',
      
      // Disable file watching when DISABLE_HMR is true to save CPU
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },

    build: {
      // Optimize for smaller bundle size in artifact environment
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },

    // Ensure environment variables are accessible
    optimizeDeps: {
      esbuildOptions: {
        target: 'ES2022',
      },
    },
  };
});
