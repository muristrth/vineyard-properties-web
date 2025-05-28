// prettier.config.js

/** @type {import('prettier').Config} */
const prettierConfig = {
  // Load the Tailwind CSS plugin
  plugins: ['prettier-plugin-tailwindcss'],

  // Add your Prettier formatting options here.
  // These are common and generally recommended:
  singleQuote: true, // Use single quotes instead of double quotes
  semi: true, // Add semicolons at the end of statements
  tabWidth: 2, // Use 2 spaces for indentation
  printWidth: 80, // Wrap lines after 80 characters (adjust as you prefer)
  trailingComma: 'all', // Add trailing commas where valid (ES5, None, All)
  // You can add more options based on your team's style guide
  // For example:
  // arrowParens: "always", // Always include parentheses around a sole arrow function parameter
  // endOfLine: "lf", // Line Feed only (for cross-platform consistency)
};

export default prettierConfig; // Or module.exports = prettierConfig; if using CommonJS
