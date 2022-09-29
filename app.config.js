export default ({ config }) => {
  const publishEnabled = process.env.BUILD_PUBLISH_ENABLED;

  if (publishEnabled) {
    const versionCode = process.env.VERSION_CODE;

    if (!versionCode) {
      throw new Error('No VERSION_CODE defined');
    }

    const mapsApiKey = process.env.MAPS_API_KEY;

    if (!mapsApiKey) {
      throw new Error('No MAPS_API_KEY defined');
    }

    const easProjectId = process.env.EAS_PROJECT_ID

    if (!easProjectId) {
      throw new Error('No EAS_PROJECT_ID defined');
    }

    config.extra = config.extra || {};
    config.extra.eas = config.extra.eas || {};
    config.extra.eas.projectId = easProjectId;

    config.android = config.android || {};
    config.android.versionCode = parseFloat(versionCode);
    config.android.config = config.android.config || {};
    config.android.config.googleMaps = config.android.config.googleMaps || {};
    config.android.config.googleMaps.apiKey = mapsApiKey;

    config.ios = config.ios || {};
    config.ios.config = config.ios.config || {};
    config.ios.config.googleMapsApiKey = mapsApiKey;
  }

  return {
    ...config,
  };
};
