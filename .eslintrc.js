const { eslint, deepmerge } = require('@ice/spec');

module.exports = deepmerge(eslint, {
  rules: {
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
  },
});
