import { AsyncStorage } from 'react-native';

const withAsyncStorage = (cacheKey, fallback) => {
  return async (...params) => {
    let storedValue = await AsyncStorage.getItem(cacheKey);
    if (storedValue) storedValue = JSON.parse(storedValue);
    const newValue = await fallback(...params, storedValue);
    if (storedValue !== newValue) {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(newValue));
    }
    return newValue;
  }
};

export default withAsyncStorage;