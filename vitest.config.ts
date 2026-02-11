import { defineConfig } from 'vitest/config';

export default defineConfig({
  cacheDir: process.env.VITEST ? '.vitest' : undefined,
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.test.ts',
        'node_modules/**',
        'dist/**',
        'types/**',
        '**/*.ts:1',
      ],
      thresholds: {
        lines: 98,
        functions: 100,
        branches: 92,
        statements: 98,
      },
    },
    include: ['src/**/*.test.ts'],
    exclude: ['node_modules/**', 'dist/**', 'types/**'],
  },
});
