import removeAccents from 'remove-accents';
import { distance } from 'fastest-levenshtein';
import { EVENT_CATEGORIES_INFO } from '../event-properties';

const getCategoriesByKey = () => {
  const result = new Map();

  for (const index in EVENT_CATEGORIES_INFO) {
    const category = EVENT_CATEGORIES_INFO[index];
    const id = category.id;
    for (const keyIndex in category.keys) {
      const key = category.keys[keyIndex];
      result.set(key, id);
    }
  }

  return result;
};

const eventCategoriesByKeyMap = getCategoriesByKey();
const eventCategoryKeys = Array.from(eventCategoriesByKeyMap.keys());

export const matchCategoryByName = categoryName => {
  const key = findBestMatch(eventCategoryKeys, categoryName);
  if (key) {
    return eventCategoriesByKeyMap.get(key);
  } else {
    return null;
  }
};

const findBestMatch = (categories, value) => {
  const candidate = normalize(value);
  let bestScore = -1;
  let bestMatch = null;

  for (let i = 0; i < categories.length; ++i) {
    const category = categories[i];
    const distSteps = distance(candidate, category);

    const ratio = distSteps / ((category.length + candidate.length) / 2.0);
    const score = 1 / (1 + ratio);
    if (score > 0.75 && score > bestScore) {
      bestScore = score;
      bestMatch = category;
    }
  }

  return bestMatch;
};

const normalize = value => {
  const noAccents = removeAccents(value.trim());
  return noAccents.toUpperCase().replace(/ +/, '_');
};
