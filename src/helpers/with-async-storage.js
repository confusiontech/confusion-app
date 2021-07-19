import AsyncStorage from '@react-native-async-storage/async-storage';

export const PROGRAM_STORAGE_KEY = '@ConfusionApp:program';
export const FAVORITES_STORAGE_KEY = '@ConfusionApp:favorites';

export const withAsyncStorage = (cacheKey, fallback) => {
  return async (...params) => {
    const storedValue = await Storage.get(cacheKey);
    const newValue = await fallback(...params, storedValue);
    if (storedValue !== newValue) {
      await Storage.setItem(cacheKey, newValue);
      newValue.new = true;
    }
    return newValue;
  };
};

export const Storage = {
  set: async (storageKey, itemToBeStored) => await AsyncStorage.setItem(storageKey, JSON.stringify(itemToBeStored)),
  get: async (storageKey) => {
    const storedValue = await AsyncStorage.getItem(storageKey);
    if (storedValue) return JSON.parse(storedValue);
  }
};
