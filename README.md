Como arrancar la aplicación
===========================

1. Instalar la versión **22.11.0** de Node.js desde https://nodejs.org (o usar `nvm use` si tienes [nvm](https://github.com/nvm-sh/nvm) instalado — el proyecto incluye un `.nvmrc`)
2. Instalar las dependencias: `npm install`
3. Arrancar el servidor de desarrollo: `npx expo start`

Esto lanzará la aplicación y mostrará un código QR que podrá ser leído con la aplicación móvil de Expo.

**Versiones principales**

| Herramienta | Versión |
|---|---|
| Node.js | 22.11.0 (LTS) |
| Expo SDK | 56 |
| React Native | 0.85.3 |
| React | 19.2.3 |

Como ejecutar la aplicación en el móvil
=======================================

Hace falta descargar la aplicación "Expo" para Android o iOS: https://expo.io/tools#client
Una vez descargada, hay que escanear el código QR que se muestra después de correr la app en el terminal.

Como ejecutar los tests y el linter
=====================================

Ejecutar los tests unitarios:
```
npm run test:unit
```

Ejecutar el linter (ESLint):
```
npm run lint
```

Corregir automáticamente los errores del linter:
```
npm run lint:fix
```

Como subir la app a AppleStore y PlayStore
=======================================

Android
-----
- In `app.json` define a new version number in `android.versionCode` and add the googleMaps key in `android.config.googleMaps.apiKey` (get the key from Google console https://console.cloud.google.com/apis/credentials?project=active-cove-284317)
- Create the bundle by runnning `eas build --platform android`
- When the build finished, download from https://expo.dev/accounts/diegov/projects/confusionapp/builds the bundle
- Go to Google Play Console and log in with possibility. In "Produción" tab click on "Crear una nueva versión". Upload the bundle, save changes and get to submit them. In the Tab "Resumen de versiones" there will then appear the new version in status "Under revision".

IOS
----
MAC IS NEEDED

- In `app.json` define a new version number in `ios.buildNumber` (must be a string) and add the googleMaps key in `ios.config.googleMapsApiKey` (get the key from Google console https://console.cloud.google.com/apis/credentials?project=active-cove-284317)
- Create the bundle by runnning `eas build --platform ios`. You will be asked to log in with the possibility apple credential. 2 factor authentication with code by phone is needed as well as being enrolled (paid 99€) to the apple developer program.
- When the build finished, download from https://expo.dev/accounts/diegov/projects/confusionapp/builds the bundle
- Go to Apple Developer Console....

Contacto
=========
contacta@beniconfusionfest.es

Licencia
========
GNU General Public License v3.0
