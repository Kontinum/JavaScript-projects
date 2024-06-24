class SearchView {
  #ingredientInput = document.querySelector(".search-term");
  #searchBtn = document.querySelector(".search-ingredient-button");
  ingredientsDataList = document.querySelector("#ingredients");

  getSearchInput() {
    return this.#ingredientInput.value;
  }

  showAutoCompleteData(autoCompleteData) {
    let HTMLString = "";
    for (const ingredientName of autoCompleteData) {
      HTMLString += `<option value= "${ingredientName}">`;
    }

    this.ingredientsDataList.innerHTML = HTMLString;
  }

  addHandlerAutoComplete(handler) {
    this.#ingredientInput.addEventListener("keyup", handler);
  }
  addHandlerSearchIngredients(handler) {
    this.#searchBtn.addEventListener("click", handler);
  }
}

export default new SearchView();
