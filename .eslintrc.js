module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['next', 'standard-with-typescript'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ],
}