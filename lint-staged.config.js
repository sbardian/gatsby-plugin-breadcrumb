module.exports = {
  '*.{js,ts,tsx}': ['prettier ./src --write', 'eslint ./src --fix', 'git add'],
  '*.{html,json,md,yml,yaml}': ['prettier ./src --write', 'git add'],
}
