#!/usr/bin/env bash

# Copied from https://github.com/vy/vy.github.io/blob/source/publish.sh
set -e
set -x

isEverythingComitted() {
	outputLineCount=$(git status -s | wc -l) #| grep -q "nothing to commit, working directory clean"
	[ $outputLineCount -eq 0 ]
}

getLastCommitId() {
	git log -1 | head -n 1 | awk '{print $2}'
}

echo "*** Checking repository state... "
isEverythingComitted || {
	echo "error: there are still changes to be committed." >&2
	exit 1
}
lastCommitId=$(getLastCommitId)

echo "*** Compiling..."
node ./_dev/run.js
# TODO: remove dependency to gulp
gulp

echo "*** Switching to master..."
git checkout master

echo "*** Syncing output files..."
rsync --exclude-from rsync-excludes.txt -a --delete --force _site/ .

echo "*** Adding all output files to the repository..."
git add .

echo "*** Committing changes..."
git commit -a -m "Copied changes from source/$lastCommitId."

echo "*** Pushing changes..."
git push -f origin master source

echo "*** Switching back to source..."
git checkout source
