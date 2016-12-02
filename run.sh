#!/usr/bin/env bash

rsync -a --delete --force _img/ _site/img
node ./_dev/run.js
gulp
