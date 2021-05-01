#!/bin/bash
source .aws/.utils.sh

DOMAIN="staged.aws.anime-skip.com"
STACK_ENV="Staged"
if [[ "$1" == "prod" ]]; then
    DOMAIN="aws.anime-skip.com"
    STACK_ENV="Prod"
fi
bullet "${DIM}Environment: $RESET$STACK_ENV"
bullet "${DIM}Website: $RESET$DOMAIN"

if [[ "$CI" == "true" ]]; then
    title "CI Deploy"
else
    title "Manual Deploy"
fi

if [[ "$SKIP_BUILD" != "true" ]]; then
    if [[ "$1" == "prod" ]]; then
        run "Build production site" "yarn build"
    else
        run "Build staged site" "yarn build:staged"
    fi
fi

run "Uploading to S3" "aws s3 sync dist s3://$DOMAIN $AWS_ARGS --delete"

TEMP_FILE=$(mktemp)
run "Looking up distribution ID" "aws cloudformation describe-stacks $AWS_ARGS --output text --query \"Stacks[?StackName == 'WebsiteStack${STACK_ENV}'].{Outputs:Outputs}[0].Outputs[?starts_with(OutputKey, 'Website${STACK_ENV}DistributionId')].OutputValue\" > $TEMP_FILE && cat '$TEMP_FILE'"
ID=$(cat "$TEMP_FILE")

run "Invalidating CloudFront cache" "aws cloudfront create-invalidation $AWS_ARGS --distribution-id '$ID' --paths \"/*\""
