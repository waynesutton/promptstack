import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import convexPlugin from '@convex-dev/eslint-plugin';

export default tseslint.config(
  { ignores: ['dist', 'convex/_generated'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['convex/**/*.ts'],
    plugins: { '@convex-dev': convexPlugin },
    rules: {
      '@convex-dev/no-old-registered-function-syntax': 'error',
      '@convex-dev/require-args-validator': 'error',
      // Every public function must call a require*/can*/check* style access helper
      '@convex-dev/require-access-control': 'error',
      '@convex-dev/explicit-table-ids': 'error',
      '@convex-dev/no-filter-in-query': 'error',
      // searchPrompts still reads every public prompt; see SECURITY.md
      '@convex-dev/no-collect-in-query': 'warn',
      '@convex-dev/no-schema-import-cycle': 'error',
      '@convex-dev/no-duplicate-indexes': 'error',
      '@convex-dev/no-process-env': 'error',
    },
  },
  {
    // Convex reads auth providers from process.env in auth.config.ts by design
    files: ['convex/auth.config.ts'],
    rules: { '@convex-dev/no-process-env': 'off' },
  },
);
