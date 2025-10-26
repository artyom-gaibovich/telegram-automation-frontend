import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: [
      './src/app/**',
      './src/shared/**',
      './src/entities/**',
      './src/widgets/**',
      './src/features/**',
    ],
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
  {
    files: ['./src/pages/**'],
    rules: {
      'fsd/no-segmentless-slices': 'off',
      'fsd/public-api': 'off',
    },
  },
]);
