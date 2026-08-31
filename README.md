# Como arrancar la aplicación

## Requisitos

1. Instalar la versión **22.11.0** de Node.js desde https://nodejs.org o usar `nvm use` si tienes [nvm](https://github.com/nvm-sh/nvm) instalado. El proyecto incluye un `.nvmrc`.
2. Instalar las dependencias:

```bash
npm install
```

3. Tener una cuenta de Expo y acceso al proyecto EAS.

**Versiones principales**

| Herramienta  | Versión       |
| ------------ | ------------- |
| Node.js      | 22.11.0 (LTS) |
| Expo SDK     | 56            |
| React Native | 0.85.3        |
| React        | 19.2.3        |

---

# Como ejecutar la aplicación durante el desarrollo

La aplicación utiliza `react-native-maps`, que requiere código nativo. Por este motivo, para desarrollar y probar el mapa se debe utilizar un **Expo Development Build** en lugar de Expo Go.

### Primera vez: instalar EAS CLI

Instalar EAS CLI globalmente:

```bash
npm install -g eas-cli
```

Comprobar la instalación:

```bash
eas --version
```

Iniciar sesión con la cuenta de Expo:

```bash
eas login
```

Comprobar la cuenta:

```bash
eas whoami
```

### Crear el Development Build

Si todavía no existe una configuración EAS para el proyecto:

```bash
eas init
```

El proyecto debe quedar asociado al proyecto EAS correspondiente.

Para crear un Development Build de Android:

```bash
eas build --profile development --platform android
```

Cuando el build termine, EAS proporcionará un enlace para descargar el APK.

Instalar el APK en el teléfono Android.

> Este APK es una aplicación propia del proyecto que contiene los módulos nativos necesarios. No es Expo Go.

### Arrancar el servidor de desarrollo

Con el Development Build instalado en el teléfono:

```bash
npx expo start --dev-client
```

Esto arrancará Metro y mostrará un QR.

Abrir el Development Build instalado en el teléfono y conectarlo al servidor de desarrollo.

Si el teléfono y el ordenador están en la misma red local, normalmente bastará con:

```bash
npx expo start --dev-client
```

Si hay problemas de conexión a Metro, puede utilizarse:

```bash
npx expo start --dev-client --tunnel
```

### Flujo habitual de desarrollo

Una vez creado e instalado el Development Build, normalmente **no es necesario volver a hacer `eas build` después de cada cambio de JavaScript**.

El flujo normal es:

```bash
npx expo start --dev-client
```

Modificar el código → guardar → la aplicación se actualiza mediante Fast Refresh.

Hay que volver a crear el Development Build cuando se modifiquen elementos que requieren cambios nativos, por ejemplo:

* añadir o eliminar una librería nativa
* cambiar configuración nativa
* cambiar configuración de plugins de Expo
* cambiar determinadas opciones de `app.json`
* actualizar Expo o React Native
* cambiar configuración relacionada con Google Maps

En esos casos:

```bash
eas build --profile development --platform android
```

y volver a instalar el nuevo APK.

---

# Google Maps

La aplicación utiliza `react-native-maps`.

Para Android, la API key de Google Maps se configura en `app.json`:

```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

La API key se obtiene desde Google Cloud Console:

https://console.cloud.google.com/apis/credentials

La key debe tener habilitada la API necesaria para Google Maps Android.

### Importante

La configuración de Google Maps forma parte del **build nativo**.

Por tanto, después de modificar:

```text
android.config.googleMaps.apiKey
```

es necesario generar un nuevo Development Build:

```bash
eas build --profile development --platform android
```

No basta con ejecutar:

```bash
npx expo start
```

porque `expo start` solamente arranca Metro; no modifica el código nativo de la aplicación ya instalada.

---

# Configuración EAS

El proyecto utiliza `eas.json` para definir los distintos tipos de build.

Un ejemplo de configuración:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

### Development

Para desarrollo:

```bash
eas build --profile development --platform android
```

Este build contiene el Development Client y permite utilizar:

```bash
npx expo start --dev-client
```

### Preview

Para generar una aplicación instalable para pruebas que no dependa del servidor Metro:

```bash
eas build --profile preview --platform android
```

### Production

Para generar el bundle de producción para Google Play:

```bash
eas build --platform android
```

---

# Como ejecutar los tests y el linter

Ejecutar los tests unitarios:

```bash
npm run test:unit
```

Ejecutar el linter:

```bash
npm run lint
```

Corregir automáticamente los errores del linter:

```bash
npm run lint:fix
```

---

# Como subir la app a Apple Store y Play Store

## Android

Antes de crear el build de producción:

1. En `app.json`, definir un nuevo `android.versionCode`.
2. Comprobar que la Google Maps API key está configurada:

```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

3. Crear el bundle:

```bash
eas build --platform android
```

4. Cuando termine el build, descargar el `.aab` desde EAS.

5. Ir a Google Play Console y crear una nueva versión en producción.

6. Subir el `.aab`, guardar los cambios y enviar la versión a revisión.

La Google Maps API key utilizada actualmente se gestiona desde Google Cloud Console:

https://console.cloud.google.com/apis/credentials?project=active-cove-284317

## IOS

**Se necesita un Mac para generar el build localmente, aunque EAS permite realizar el build de iOS en la nube.**

Antes de crear el build:

1. En `app.json`, definir un nuevo `ios.buildNumber` como string.
2. Configurar la Google Maps API key:

```json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "GOOGLE_MAPS_API_KEY"
      }
    }
  }
}
```

3. Crear el build:

```bash
eas build --platform ios
```

EAS solicitará las credenciales de Apple Developer cuando sean necesarias.

Es necesario estar inscrito en el Apple Developer Program y disponer de las credenciales correspondientes.

Cuando termine el build, descargarlo desde EAS y continuar con el proceso de publicación en App Store Connect.

---

# Resumen del flujo de desarrollo

### Primera configuración

```bash
npm install
npm install -g eas-cli
eas login
eas init
eas build --profile development --platform android
```

Instalar el APK generado en el teléfono.

### Desarrollo diario

```bash
npx expo start --dev-client
```

Abrir el Development Build en el teléfono.

### Si se modifica código JavaScript/React

No es necesario generar otro build:

```text
Guardar código → Fast Refresh
```

### Si se modifica configuración nativa

Generar un nuevo Development Build:

```bash
eas build --profile development --platform android
```

Instalar el nuevo APK y continuar con:

```bash
npx expo start --dev-client
```

---

# Contacto

[contacta@confusion.possibilitats.org](mailto:contacta@confusion.possibilitats.org)

# Licencia

GNU General Public License v3.0
