#!/bin/bash

nightly_deploy() {
    echo "Deploy to dev needed"
    echo "::set-output name=DEPLOY_TYPE::none"
    exit 0
}

staging_deploy() {
    echo "Deploy to staging needed"
    echo "New version: $VERSION"
    echo "::set-output name=DEPLOY_TYPE::prod"
    exit 0
}

prod_deploy() {
    echo "Deploy to production needed"
    echo "New version: $VERSION"
    echo "::set-output name=DEPLOY_TYPE::prod"
    exit 0
}

# Flow

git remote add heroku "https://heroku:$HEROKU_API_KEY@git.heroku.com/anime-skip-web.git"
git fetch heroku &> /dev/null

VERSION_DIFF="$(git diff heroku/master -- package.json | grep '"version": ')"
VERSION=$(node -e "console.log(require('./package.json').version)")

echo ""
echo -e "VERSION_DIFF:\n$VERSION_DIFF"
echo "---"
echo -e "VERSION:\n$VERSION"
echo ""

if [[ "$VERSION_DIFF" == "" ]]; then
    nightly_deploy
fi

if [[ "$VERSION" == "*-staging" ]]; then
    staging_deploy
fi

prod_deploy
