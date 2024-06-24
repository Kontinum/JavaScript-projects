import {
  API_KEY,
  API_LINK_BASE,
  AUTOCOMPLETE_PART,
  AUTOCOMPLETE_LIMIT,
  SEARCH_PART,
  SEARCH_LIMIT,
  GLYCEMIC_CHARTS,
} from "./config.js";

export const AJAX = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} - ${res.status}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getSearchAutoCompleteLink = function (searchTerm) {
  return (
    getBaseLinkWithApiKey(AUTOCOMPLETE_PART) +
    `&query=${searchTerm}&number=${AUTOCOMPLETE_LIMIT}`
  );
};

export const getSearchIngredientsLink = function (searchTerm) {
  return (
    getBaseLinkWithApiKey(SEARCH_PART) +
    `&query=${searchTerm}&number=${SEARCH_LIMIT}`
  );
};

export const getShowIngredientLink = function (ingredientId) {
  return `${API_LINK_BASE}/${ingredientId}/information?${API_KEY.string}=${API_KEY.value}&amount=1`;
};

const getBaseLinkWithApiKey = function (endpoint) {
  return `${API_LINK_BASE}/${endpoint}?${API_KEY.string}=${API_KEY.value}`;
};

export const getGlycemicData = function (
  ingredientGlycemicIndex,
  ingredientGlycemicLoad
) {
  const glycemicIndexData = GLYCEMIC_CHARTS.index.filter(
    (glycemic) =>
      glycemic.min <= ingredientGlycemicIndex &&
      glycemic.max >= ingredientGlycemicIndex
  );

  const glycemicLoadData = GLYCEMIC_CHARTS.load.filter(
    (glycemic) =>
      glycemic.min <= ingredientGlycemicLoad &&
      glycemic.max >= ingredientGlycemicLoad
  );

  return {
    index: glycemicIndexData.at(0),
    load: glycemicLoadData.at(0),
  };
};
