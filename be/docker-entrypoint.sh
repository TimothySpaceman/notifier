#!/bin/sh

npm install

npm cache clean -f
npm cache verify

set -e

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi

exec "$@"