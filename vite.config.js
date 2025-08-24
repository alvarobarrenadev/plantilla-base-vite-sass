import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: "/NOMBRE_DEL_REPO/", // Solo para Github Pages. Para desplegar en Vercel, solo poner /
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // Puedes añadir más páginas así:
        // location: resolve(__dirname, "location.html"),
        // about: resolve(__dirname, 'about.html'),
        // contact: resolve(__dirname, 'contact.html'),
        // gallery: resolve(__dirname, 'gallery.html'),
      },
    },
  },
  resolve: {
    alias: {
      // Alias principal para la carpeta src
      "@": resolve(__dirname, "./src"),

      // Alias específicos para Sass
      "@sass": resolve(__dirname, "./src/sass"),
      "@abstracts": resolve(__dirname, "./src/sass/abstracts"),
      "@components": resolve(__dirname, "./src/sass/components"),
      "@layout": resolve(__dirname, "./src/sass/layout"),
      "@themes": resolve(__dirname, "./src/sass/themes"),
      "@base": resolve(__dirname, "./src/sass/base"),
      "@pages": resolve(__dirname, "./src/sass/pages"),
      "@vendors": resolve(__dirname, "./src/sass/vendors"),
    },
  },
  css: {
    devSourcemap: true, // Facilita la depuración de Sass
    preprocessorOptions: {
      scss: {
        includePaths: [
          resolve(__dirname, "./src/sass"),
          resolve(__dirname, "./src/sass/abstracts"),
          resolve(__dirname, "./src/sass/components"),
          resolve(__dirname, "./src/sass/layout"),
          resolve(__dirname, "./src/sass/base"),
          resolve(__dirname, "./src/sass/pages"),
          resolve(__dirname, "./src/sass/themes"),
          resolve(__dirname, "./src/sass/vendors"),
        ],
      },
    },
  },
});