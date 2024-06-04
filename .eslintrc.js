module.exports = {
    
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      // Stylistic Issues
    'indent': ['error', 2], // enforce consistent indentation (you can change 2 to your preferred number of spaces)
    //'quotes': ['error', 'single'], // enforce the consistent use of single quotes
    //'semi': ['error', 'always'], // require or disallow semicolons instead of ASI
    
    // ES6 Rules
    //'arrow-parens': ['error', 'always'], // require parentheses around arrow function arguments
    //'arrow-spacing': 'error', // enforce consistent spacing before and after the arrow in arrow functions
    //'no-var': 'error', // require `let` or `const` instead of `var`

    }
  };
  