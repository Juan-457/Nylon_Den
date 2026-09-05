#!/bin/sh
# Activa los git hooks versionados de este repo (correr una vez por clon).
set -e
cd "$(git rev-parse --show-toplevel)"
git config core.hooksPath .githooks
chmod +x .githooks/*
echo "Hooks activados: core.hooksPath -> .githooks"
