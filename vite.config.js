import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import viteSvgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteSvgr(), react()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "./src/scss/variables.scss";\n@import "./src/scss/mixins.scss";\n@import "./src/scss/functions.scss";',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/main.js`,
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
