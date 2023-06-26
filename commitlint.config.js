module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "type-enum": [2, "always", ['Feature', 'Fix', 'Docs', 'Style', 'Refactor', 'Test', 'Revert', 'Chore', 'POC', 'Enhance']],
    "type-case": [2, 'always', ['start-case']],
    "subject-case": [2, 'always', ['sentence-case']],
  }
};
