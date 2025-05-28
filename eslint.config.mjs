// eslint.config.mjs

import { dirname } from 'path';
import { fileURLToPath } from 'url'; // Corrected capitalization here!
import { FlatCompat } from '@eslint/eslintrc';

// Import the Prettier ESLint configuration.
// This should be installed via `npm install --save-dev eslint-config-prettier`.
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url); // Corrected capitalization here!
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  // Add recommended next plugins for Next.js to ensure they are found by FlatCompat.
  // This helps compat.extends correctly locate Next.js plugins and configs
  // based on the context of your package.json dependencies.
  recommendedConfig: {
    plugins: {
      '@next/next': {}, // Essential for Next.js specific linting
    },
  },
});

const eslintConfig = [
  // Extend recommended Next.js configurations.
  // 'next/core-web-vitals' covers general Next.js and React best practices.
  // 'next/typescript' adds TypeScript-specific rules for Next.js.
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Your custom rules go here.
  // These will override any rules set by the extended configurations.
  {
    rules: {
      // Disabling some rules you previously had off.
      // Be cautious with these, as they can impact code quality or accessibility.
      '@typescript-eslint/no-unused-vars': 'off', // Consider enabling this to catch dead code.
      'react/no-unescaped-entities': 'off', // Can affect how text is rendered in JSX.
      '@next/next/no-img-element': 'off', // Strongly consider using Next.js <Image> for optimization and accessibility.
      'jsx-a11y/alt-text': 'off', // This impacts accessibility significantly; reconsider enabling and adding alt text.
    },
  },

  // Place `prettierConfig` last to ensure it disables all conflicting ESLint rules.
  // This prevents ESLint from reporting formatting issues that Prettier will handle.
  prettierConfig,
];

export default eslintConfig;
