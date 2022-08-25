#!/usr/bin/env sh

# abort on errors
set -e

# build
bun run build

# navigate into the build output directory
cd dist

echo 'cykreet.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:cykreet/cykreet.com.git main:gh-pages

cd -