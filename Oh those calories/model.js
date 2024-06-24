import {
  getSearchAutoCompleteLink,
  getSearchIngredientsLink,
  getShowIngredientLink,
  getGlycemicData,
  AJAX,
} from "./helpers.js";

export const state = {
  autocompleteData: [],
  ingredient: {},
  search: {
    term: "",
    results: [],
    total: 0,
  },
};

const setAutoCompleteData = function (autoCompleteResults) {
  state.autocompleteData = autoCompleteResults.map((ingredient) => {
    return ingredient.name;
  });
};

const setSearchIngredientsData = function (searchIngredientsResults) {
  state.search.results = searchIngredientsResults.results;
  state.search.total = searchIngredientsResults.results.length;
};

const setIngredientData = function (ingredientResult) {
  const {
    originalName,
    image,
    nutrition: { nutrients, properties, flavonoids, caloricBreakdown },
    amount,
  } = ingredientResult;

  const [ingredientGIndex, ingredientGLoad] = properties;

  const {
    percentProtein: protein,
    percentFat: fat,
    percentCarbs: carb,
  } = caloricBreakdown;

  state.ingredient = {
    name: originalName,
    image,
    amount,
    percentageNutrients: {
      protein,
      fat,
      carb,
    },
    nutrients,
    flavonoids,
    glycemicData: getGlycemicData(
      ingredientGIndex.amount,
      Math.ceil(ingredientGLoad.amount)
    ),
  };
};

export const loadAutoCompleteData = async function (searchTerm) {
  try {
    const data = await AJAX(getSearchAutoCompleteLink(searchTerm));

    setAutoCompleteData(data);
  } catch (error) {
    throw error;
  }
};

export const loadSearchIngredientsData = async function (searchTerm) {
  try {
    state.search.term = searchTerm;

    const data = await AJAX(getSearchIngredientsLink(searchTerm));

    setSearchIngredientsData(data);
  } catch (error) {
    throw error;
  }
};

export const loadShowIngredientData = async function (ingredientId) {
  try {
    const data = await AJAX(getShowIngredientLink(ingredientId));

    setIngredientData(data);
  } catch (error) {
    throw error;
  }
};
