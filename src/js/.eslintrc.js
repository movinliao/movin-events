module.exports = {
  root: true,
  globals: {
    $: true,
    Vue: true,
    Regular: true
  },
  env: {
    'browser': true
  },
  extends: 'airbnb-base/legacy',
  rules: {
    'linebreak-style': 0,
    'no-debugger': global.production ? 2 : 0,
    'no-console': global.production ? 1 : 0,
    'func-names': 0,
    'no-new': 0
  }
};
