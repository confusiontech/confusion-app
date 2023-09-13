import AsyncStorage from '@react-native-async-storage/async-storage';

import { EVENT_ID } from '../event-properties';

export const PROGRAM_STORAGE_KEY = `@ConfusionApp:program:v2:${EVENT_ID}`;
export const FAVORITES_STORAGE_KEY = `@ConfusionApp:favorites:v2:${EVENT_ID}`;

export const withAsyncStorage = (cacheKey, fallback) => {
  const retVal = async (...params) => {
    const storedValue = await Storage.get(cacheKey);
    const newValue = await fallback(...params, storedValue);

    if (!storedValue || storedValue.program_timestamp !== newValue.program_timestamp) {
      await Storage.set(cacheKey, newValue);
      newValue.new = true;
    }
    return newValue;
  };

  retVal.getCachedValue = async () => {
    return await Storage.get(cacheKey);
  };

  return retVal;
};

export const Storage = {
  set: async (storageKey, itemToBeStored) => await AsyncStorage.setItem(storageKey, JSON.stringify(itemToBeStored)),
  get: async (storageKey) => {
    const storedValue = await AsyncStorage.getItem(storageKey);
    if (storedValue) return JSON.parse(storedValue);
  }
};
