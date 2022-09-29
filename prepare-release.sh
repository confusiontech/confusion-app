#!/usr/bin/env bash

# Antes de ejecutar este script hay que exportar algunas variables de entorno.

# 1. Version de la aplicacion para Android. Es un entero que hay que incrementar con cada release
# export VERSION_CODE=...

# 2. Google maps API KEY (string)
# export MAPS_API_KEY=...

# 3. UUID del proyecto de Expo (string)
# export EAS_PROJECT_ID=...

set -e
set -o pipefail

export BUILD_PUBLISH_ENABLED=1

eas build --platform android # --local
# eas build --platform ios
