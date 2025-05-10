import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Remove the import for 'path' as it's no longer needed
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': './src', // You can keep this relative path as an alias for now
    },
  },
});
