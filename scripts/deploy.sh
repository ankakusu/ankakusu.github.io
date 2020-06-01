#!/usr/bin/env bash

COMMIT_DATE=$(date '+%Y-%m-%d %H:%M:%S');
git checkout master
rsync -ar _site/ .

git add .
git commit -m "$COMMIT_DATE $1"
git checkout develop
