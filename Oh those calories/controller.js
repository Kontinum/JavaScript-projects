import * as Config from "./config.js";
import * as Model from "./model.js";
import { getGlycemicData } from "./helpers.js";

import SearchView from "./views/SearchView.js";
import ResultsView from "./views/ResultsView.js";
import IngredientView from "./views/IngredientView.js";

const glycemicData = getGlycemicData(69, Math.ceil(10.01));

console.log(glycemicData);

const controlSearchAutocomplete = async function () {
  const searchTerm = SearchView.getSearchInput();

  if (searchTerm.length === Config.MIN_LENGTH_FOR_AUTOCOMPLETE) {
    await Model.loadAutoCompleteData(searchTerm);

    SearchView.showAutoCompleteData(Model.state.autocompleteData);
  }
};

const controlSearchIngredients = async function () {
  try {
    const searchTerm = SearchView.getSearchInput();
    if (!searchTerm) return;

    ResultsView.emptyResults();
    ResultsView.showLoader();

    await Model.loadSearchIngredientsData(searchTerm);

    ResultsView.hideLoader();

    ResultsView.displayResults(Model.state.search);
  } catch (error) {
    ResultsView.renderError(error);
  }
};

const controlShowIngredient = async function (ingredientId) {
  try {
    ResultsView.toggleClickedIngredientActive(ingredientId);

    IngredientView.emptyResults();
    IngredientView.hideSiteInfo();
    IngredientView.showLoader();

    await Model.loadShowIngredientData(ingredientId);

    IngredientView.hideLoader();

    console.log(Model.state.ingredient);

    IngredientView.displayIngredient(Model.state.ingredient);
  } catch (error) {
    console.log(error);

    IngredientView.renderError();
  }
};

const init = function () {
  SearchView.addHandlerAutoComplete(controlSearchAutocomplete);
  SearchView.addHandlerSearchIngredients(controlSearchIngredients);
  ResultsView.addHandlerShowIngredient(controlShowIngredient);
};

init();
