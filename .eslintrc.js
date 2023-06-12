/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 17:36:59
 * @LastEditTime: 2023-06-12 17:42:38
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/.eslintrc.js
 * 工作，生活，健康
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    eqeqeq: 0,
    'comma-dangle': 0,
    'handle-callback-err': 0,
    'no-console': 0,
    'vue/no-side-effects-in-computed-properties': 0,
    'vue/max-attributes-per-line': 'off',
    'vue/attributes-order': 'off',
    'no-unused-vars': 'off',
    'no-control-regex': 0,
    'no-empty-pattern': 2,
    'no-useless-escape': 0,
    'no-undef': 0,
  },
}
