module.exports = {
  '*.{js,ts,tsx}': ['prettier ./src --write', 'eslint ./src --fix'],
  '*.{html,json,md,yml,yaml}': ['prettier ./src --write'],
}
