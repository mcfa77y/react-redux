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
    parser: 'babel-eslint',
    rules: {
        'linebreak-style': 'off',
        'react/jsx-indent': [0, 2],
        'jsx-indent-props': [0, 2],
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        "import/extensions": 'off',
        camelcase: 'off',
        indent: [
            'error',
            2
        ]
    },
    settings: {
        react: {
            version: "detect"
        },
        'import/resolver': {
            "node": {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                "paths": ["src"]
            }
        },
    }
};
