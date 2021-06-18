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
  }
};

const store = (storageKey, favorites) => {
  
};

export default withAsyncStorage;