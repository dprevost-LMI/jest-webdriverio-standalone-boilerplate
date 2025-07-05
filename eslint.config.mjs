import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import * as wdio from 'eslint-plugin-wdio';

export default [
  js.configs.recommended,
  {
    ignores: ['.yalc/**', 'node_modules/**', 'dist/**', 'build/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        chrome: 'readonly',
        globalThis: 'readonly',
        console: 'readonly',
        process: 'readonly',
        WebdriverIO: 'readonly',
        wiremockLauncher: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      jest,
      wdio,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      
      // General JavaScript/TypeScript rules
      'no-console': 'off', // Allow console.log for test tracing
      'no-unused-vars': 'off', // Use TypeScript version instead
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': 'error',
      'curly': 'error',
      
      // Code style
      'indent': ['error', 2],
      'quotes': ['error', 'double'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      
      // Jest rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      
      // WebdriverIO rules
      'wdio/await-expect': 'error',
      'wdio/no-debug': 'error',
      'wdio/no-pause': 'warn',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts', '__tests__/**/*.ts'],
    languageOptions: {
      globals: {
        chrome: 'readonly',
        expect: 'readonly',
        test: 'readonly',
        describe: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      // Allow any types in tests for flexibility
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow non-null assertions in tests
      '@typescript-eslint/no-non-null-assertion': 'off',
      // WebdriverIO expect() calls should be awaited
      'wdio/await-expect': 'error',
    },
  },
  {
    files: ['*.config.js', '*.config.mjs', '*.config.ts'],
    languageOptions: {
      globals: {
        module: 'readonly',
        exports: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.js',
      '*.mjs',
      'coverage/**',
      '__stubs__/**',
      '.history/**',
    ],
  },
];
