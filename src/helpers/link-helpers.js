import { Platform } from 'react-native';

const EXTERNAL_MAP_ZOOM = 15;

export const getMapAppLink = (latitude, longitude) => {
  if (Platform.OS === 'ios') {
    return `https://maps.apple.com/?daddr=${latitude},${longitude}&z=${EXTERNAL_MAP_ZOOM}`;
  } else {
    return `https://www.google.com/maps/place/${latitude},${longitude}/@${latitude},${longitude},${EXTERNAL_MAP_ZOOM}z`;
  }
};
