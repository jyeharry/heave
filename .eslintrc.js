module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'index', 'sibling'],
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
}
