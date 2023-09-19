Como arrancar la aplicación
===========================

1. Instalar expo cli
2. Instalar la version 14.17 de nodejs desde https://nodejs.org
3. npm install
4. expo start

Esto lanzará la aplicación y mostrará un codigo QR que podrá ser leido con la aplicacion movil de Expo. 

Como ejecutar la aplicación el el móvil
=======================================

Hace falta descargar la aplicación "Expo" para Android o iOS: https://expo.io/tools#client
Una vez descargada, hay que escanear el código QR que se muestra despues de correr la app en el terminal. 

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
- Go to Apple Developer Concole....

Contacto
=========
contacta@beniconfusionfest.es

Licencia
========
GNU General Public License v3.0

