#!/bin/bash
VERSION_DIFF="$(git diff heroku/master | grep '"version": ')"

if [[ "$VERSION_DIFF" == "" ]]; then
    export VERSION_CHANGE="No change"
else 
    export VERSION_CHANGE="New release"
fi

echo $VERSION_CHANGE