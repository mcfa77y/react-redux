module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
    },
    plugins: [
        'react',
    ],
    rules: {
        'linebreak-style': 'off',
        'react/jsx-indent': [0, 4],
        'jsx-indent-props': [0, 4],
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        camelcase: 'off',
        indent: [
            'error',
            4
        ]
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
