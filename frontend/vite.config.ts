// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // permite importar com @/diretorio
    },
  },
  build: {
    outDir: 'dist', // pasta de saída do build
    sourcemap: true, // útil para debug em produção (opcional)
  },
  server: {
    port: 5173, // porta local padrão do Vite
  },
});
