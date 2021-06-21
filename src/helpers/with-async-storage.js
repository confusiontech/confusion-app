import AsyncStorage from '@react-native-async-storage/async-storage';

const withAsyncStorage = (cacheKey, fallback) => {
  return async (...params) => {
    let storedValue = await AsyncStorage.getItem(cacheKey);
    if (storedValue) storedValue = JSON.parse(storedValue);
    const newValue = await fallback(...params, storedValue);
    if (storedValue !== newValue) {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(newValue));
      newValue.new = true;
    }
    return newValue;
  };
};

// TODO: Implementar
const store = (storageKey, favorites) => { // eslint-disable-line no-unused-vars

};

export default withAsyncStorage;
