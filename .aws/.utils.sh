#!/bin/bash

# Colors
ESC="\x1b["
RESET="${ESC}0m"
BOLD="${ESC}1m"
DIM="${ESC}2m"
RED="${ESC}91m"
GREEN="${ESC}92m"
TEAL="${ESC}96m"
PURPLE="${ESC}95m"

# Global Variables
PROFILE='default'
AWS_ARGS="--no-cli-pager --color off"
REGION="us-east-2"

# Util Functions

function title {
    echo -e "\n$BOLD$PURPLE$1$RESET"
}

function section {
    echo -e "\n$BOLD$TEAL$1$RESET"
}

function bullet {
    BULLET_ECHO_ARGS="-e"
    if [[ "$2" == "false" ]]; then
        BULLET_ECHO_ARGS="-en"
    fi
    echo $BULLET_ECHO_ARGS "$DIM●$RESET $1"
}

function run {
    if [[ "$CI" != "true" ]]; then
        echo -en "$DIM● $1...$RESET"
    fi
    TEMP_FILE=$(mktemp)
    { # try
        eval $2 &> "$TEMP_FILE" &&
        echo -en "\r" &&
        echo -e "$GREEN●$RESET $1 ${GREEN}✔ $RESET"
    } || { # catch
        echo -en "\r" &&
        echo -e "$RED● $1 ✖ $RESET"
        echo -e "${RED}$2$RESET"
        cat "$TEMP_FILE" &&
        exit 1
    }
    echo -e "${DIM}  | $2"
    if [[ "$(cat "$TEMP_FILE")" != "" ]]; then
        cat "$TEMP_FILE" | sed "s/^/${DIM}  | /"
        echo -en "$RESET"
    fi
}

# Setup

if [[ "$(which aws)" == "" ]]; then
    echo -e "AWS CLI is not installed"
    exit 1
fi

if [[ "$CI" == "true" ]]; then
    section "Setting Up Credentials"
    run "Set access key id" "aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile $PROFILE"
    run "Set access key secret" "aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile $PROFILE"
    run "Set region" "aws configure set default.region $REGION"
else
    PROFILES="$(aws configure list-profiles)"
    if [[ "$PROFILES" != "default" ]]; then
        section "Choose a profile:"
        aws configure list-profiles | sed "s/^/$DIM● $RESET/"

        echo -en "$RESET${DIM}? $RESET$BOLD"
        read PROFILE
        echo -en "$RESET"

        REGION="$(aws configure get region $AWS_ARGS)"
    fi
fi

AWS_ARGS="$AWS_ARGS --profile $PROFILE"

section "Config"
bullet "${DIM}Profile: $RESET$PROFILE"
bullet "${DIM}Region: $RESET$REGION"
