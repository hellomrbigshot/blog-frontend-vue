module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  plugins: ['vue'],
  rules: {
    'no-undef': 0,
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' }
    ]
  }
}
