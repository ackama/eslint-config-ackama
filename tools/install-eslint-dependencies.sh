#!/usr/bin/env bash

set -e

esv=${1?'must be eslint major version'}
tsv=${2?'must be typescript eslint major version'}

npm install -D \
  "eslint@$esv" \
  "@types/eslint@$esv" \
  "@eslint/js@$esv" \
  "@typescript-eslint/parser@$tsv" \
  "@typescript-eslint/eslint-plugin@$tsv"

# ESLint v9+ ships with its own types
if [ "$esv" -eq 8 ]; then
  npm install -D "@types/eslint__js@$esv"
else
  npm uninstall -D @types/eslint @types/eslint__js
fi
