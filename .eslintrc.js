module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        'eslint:recommended',
        'plugin:vue/essential',
    ],
    rules: {
        'vue/no-unused-vars': 'error',
        'eqeqeq': 'warn',
        'block-spacing': 'warn',
        'space-before-function-paren': 'warn'
    }
}