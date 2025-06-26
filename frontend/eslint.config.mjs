import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      }
    },
    plugins: {
      "@stylistic": stylistic,
      "import": importPlugin, 
    },
    rules: {
      "@stylistic/indent": ["error", 2], // Enforce 2 spaces for indentation
      "sort-imports": [
        "error",
        {
          "ignoreCase": true,
          "ignoreDeclarationSort": true,
          "ignoreMemberSort": false,
          "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
          "allowSeparatedGroups": true
        }
      ],
      "import/no-unresolved": "error",
      "import/no-named-as-default": "off",
      "import/order": [
        "error",
        {
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/components/**",
              group: "internal",
              position: "before",
            },
          ],
          groups: [
            "builtin", // Built-in imports (come from NodeJS native) go first
            "external", // External imports
            "internal", // Absolute imports
            ["sibling", "parent"], // Relative imports, the sibling and parent types they can be mingled together
            "index", // index imports
            "unknown", // unknown
          ],
          pathGroupsExcludedImportTypes: ["react"],
          alphabetize: {
            order: "asc", // sort imports alphabetically
            caseInsensitive: true, // ignore case when sorting
          },
        },
      ]
    },
    settings: {
      "import/parsers": {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true, // Always try to resolve types
          project: ['./tsconfig.node.json', './tsconfig.app.json'], // Specify the project files
        },
      },
    },
    ignores: [
      "node_modules/",
      "dist/",
      "public/",
      "tailwind.config.cjs"
    ]
  },
])
