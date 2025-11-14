import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), eslint(), svgr()],
    resolve: {
      alias: {
        '@app': '/src/app',
        '@entities': '/src/entities',
        '@features': '/src/features',
        '@pages': '/src/pages',
        '@shared': '/src/shared',
        '@widgets': '/src/widgets',
      },
    },
    server: {
      port: 5174,
      host: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3002',
          changeOrigin: true,
          secure: false,
          headers: {
            Authorization: `Bearer ${env.JWT_TOKEN}`,
          },
        },
      },
    },
  };
});
