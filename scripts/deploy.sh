#!/usr/bin/env bash

GIT_STATUS=$(git status);
#echo ${GIT_STATUS}
if [[ ${GIT_STATUS} != *"On branch develop"* ]]; then
  echo "It's there!"
fi
#
#COMMIT_DATE=$(date '+%Y-%m-%d %H:%M:%S');
#git checkout master
#rsync -ar _site/ .
#
#git add .
#git commit -m "$COMMIT_DATE $1"
#git checkout develop
