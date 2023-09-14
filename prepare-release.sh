#!/usr/bin/env bash

set -e
set -o pipefail


function cleanup {
    rm -f app.config.js
}

trap cleanup EXIT

ln -sf app.config.source.js app.config.js

eas build --platform android
eas build --platform ios