// This is for my react/typescript/vite projects
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import vitestPlugin from 'eslint-plugin-vitest';
import a11yPlugin from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
    // Base configuration for all files
    {
        ignores: ['dist/**', 'node_modules/**', 'build/**', 'coverage/**', '*.config.js'],
    },

    // JavaScript configuration
    {
        files: ['**/*.{js,jsx,mjs,cjs}'],
        extends: [js.configs.recommended],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        plugins: {
            'import': importPlugin,
        },
        rules: {
            // General JavaScript rules
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'error',

            // Import rules
            'import/first': 'error',
            'import/no-duplicates': 'error',
            'import/order': [
                'error',
                {
                    'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    'alphabetize': { order: 'asc', caseInsensitive: true }
                }
            ],
            // 'import/extensions': [
            //     'error',
            //     'ignorePackages',
            //     {
            //         js: 'never',
            //         jsx: 'never',
            //         mjs: 'never',
            //         cjs: 'never',
            //     },
            // ],
        },
    },

    // TypeScript configuration
    {
        files: ['**/*.{ts,tsx}'],
        extends: [...tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.app.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'import': importPlugin,
        },
        rules: {
            // TypeScript specific rules
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            'no-use-before-define': 'off',
            '@typescript-eslint/no-use-before-define': ['error'],

            // Override native rules with TypeScript-aware ones
            'no-unused-vars': 'off',
            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': 'error',

            // Import rules for TypeScript
            'import/first': 'error',
            'import/no-duplicates': 'error',
            'import/order': [
                'error',
                {
                    'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    'alphabetize': { order: 'asc', caseInsensitive: true }
                }
            ],
            // 'import/extensions': [
            //     'error',
            //     'ignorePackages',
            //     {
            //         ts: 'never',
            //         tsx: 'never',
            //         js: 'never',
            //         jsx: 'never',
            //     },
            // ],
        },
    },

    // React specific configuration
    {
        files: ['**/*.{jsx,tsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                React: 'writable',
            },
        },
        plugins: {
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            'react-refresh': reactRefreshPlugin,
            'jsx-a11y': a11yPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // React rules
            ...reactHooksPlugin.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            'react/jsx-props-no-spreading': 'off',
            'react/no-unknown-property': ['error', { ignore: ['css'] }],
            'react/self-closing-comp': 'error',
            'react/jsx-sort-props': ['warn', {
                callbacksLast: true,
                shorthandFirst: true,
                ignoreCase: true,
                reservedFirst: true,
            }],

            // React Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Accessibility rules
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/aria-props': 'warn',
            'jsx-a11y/aria-role': 'warn',
            'jsx-a11y/role-has-required-aria-props': 'warn',
        },
    },

    // Test files configuration
    {
        files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', '**/__tests__/**/*'],
        languageOptions: {
            globals: {
                ...globals.jest,
                vi: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                test: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
            },
        },
        plugins: {
            'vitest': vitestPlugin,
        },
        rules: {
            // Relaxed rules for test files
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            'vitest/expect-expect': 'error',
            'vitest/no-focused-tests': 'error',
            'vitest/no-identical-title': 'error',
        },
    },

    // Prettier configuration (should be last to override other formatting rules)
    prettierConfig,
    {
        files: ['**/*.{js,jsx,ts,tsx,json,css,scss,md}'],
        plugins: {
            'prettier': prettierPlugin,
        },
        rules: {
            'prettier/prettier': ['error', {
                singleQuote: true,
                trailingComma: 'es5',
                printWidth: 100,
                tabWidth: 2,
                semi: true,
            }],
        },
    }
);

