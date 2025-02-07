module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:prettier/recommended', // Make sure this is always the last element in the array.
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'import', // Add the import plugin
    ],
    rules: {
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        "import/no-cycle": ["error", { "maxDepth": 10 }], // Add the no-cycle rule to detect circular dependencies
        'react/react-in-jsx-scope': 'off',
        'import/prefer-default-export': 'off',
        'react/require-default-props': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};