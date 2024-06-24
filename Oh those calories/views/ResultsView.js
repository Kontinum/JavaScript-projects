import { IMG_LINK } from "../config.js";

class ResultsView {
  #container = document.querySelector(".search-results");
  #resultsInfo = document.querySelector(".results-count");
  #numberOfResults = document.querySelector(".count-no");
  #progress = document.querySelector(".progress");
  #errorContainer = document.querySelector(".search-error");
  #searchErrorMessageEl = document.querySelector(".search-error-message");
  #errorMessage = "Cannot display search results";

  addHandlerShowIngredient(handler) {
    this.#container.addEventListener("click", function (e) {
      if (e.target.closest(".search-result")) {
        const clickedIngredient = e.target.closest(".search-result");
        const ingredientId = clickedIngredient.dataset.id;

        handler(ingredientId);
      }
    });
  }

  toggleClickedIngredientActive(clickedIngredientId) {
    const searchResults = document.querySelectorAll(".search-result");
    for (const result of searchResults) {
      if (clickedIngredientId === result.dataset.id) {
        result.classList.add("lighten-3");
        result.classList.add("z-depth-3");
      } else {
        result.classList.remove("lighten-3");
        result.classList.remove("z-depth-3");
      }
    }
  }

  displayResults(searchResults) {
    this.#numberOfResults.textContent = searchResults.total;
    this.#resultsInfo.classList.remove("hide");

    const HTML = searchResults.results
      .map(this.#generateIngredientResultMarkup)
      .join("");

    this.#container.insertAdjacentHTML("beforeend", HTML);
  }

  #generateIngredientResultMarkup(ingredient) {
    return `<div class="card-panel grey lighten-5 search-result" data-id="${ingredient.id}">
    <div class="row valign-wrapper" data-id="${ingredient.id}">
      <div class="col s2">
        <img src="${IMG_LINK}/${ingredient.image}" alt="" class="circle responsive-img">
      </div>
      <div class="col s10 ">
        <span class="black-text">
          ${ingredient.name}
        </span>
      </div>
    </div>
  </div>`;
  }

  renderError(message = this.#errorMessage) {
    this.hideLoader();
    this.#errorContainer.classList.remove("hide");
    this.#searchErrorMessageEl.textContent = message;
  }

  showLoader() {
    this.#progress.classList.remove("hide");
  }

  hideLoader() {
    this.#progress.classList.add("hide");
  }

  emptyResults() {
    this.#container.innerHTML = "";
    this.#resultsInfo.classList.add("hide");
    this.#numberOfResults.textContent = 0;
    this.#errorContainer.classList.add("hide");
  }
}

export default new ResultsView();
